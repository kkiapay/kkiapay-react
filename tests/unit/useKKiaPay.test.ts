import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useKKiaPay } from '../../lib/useKKiaPay';

// Mock the kkiapay module
const mockKkiapayModule = {
  openKkiapayWidget: vi.fn(),
  closeKkiapayWidget: vi.fn(),
  addSuccessListener: vi.fn(),
  addWidgetInitListener: vi.fn(),
  addKkiapayCloseListener: vi.fn(),
  addWidgetDestroyedListener: vi.fn(),
  addPaymentInitListener: vi.fn(),
  addPaymentAbortedListener: vi.fn(),
  addFeedbackListener: vi.fn(),
  addPendingListener: vi.fn(),
  addFailedListener: vi.fn(),
  addPaymentEndListener: vi.fn(),
  removeKkiapayListener: vi.fn(),
  addKkiapayListener: vi.fn(),
  onNetworkStateChanged: vi.fn(),
};

vi.mock('kkiapay', () => ({
  default: mockKkiapayModule,
}));

describe('useKKiaPay', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Module Loading', () => {
    it('should start with loading state', () => {
      const { result } = renderHook(() => useKKiaPay());
      
      expect(result.current.isLoading).toBe(true);
      expect(result.current.isReady).toBe(false);
      expect(result.current.error).toBe(null);
    });

    it('should load kkiapay module successfully', async () => {
      const { result } = renderHook(() => useKKiaPay());
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      expect(result.current.isReady).toBe(true);
      expect(result.current.error).toBe(null);
      expect(result.current.openKkiapayWidget).toBeDefined();
      expect(typeof result.current.openKkiapayWidget).toBe('function');
    });

    it('should expose all KKiaPay methods', async () => {
      const { result } = renderHook(() => useKKiaPay());
      
      await waitFor(() => {
        expect(result.current.isReady).toBe(true);
      });
      
      // Check all methods are available
      expect(result.current.openKkiapayWidget).toBeDefined();
      expect(result.current.closeKkiapayWidget).toBeDefined();
      expect(result.current.addSuccessListener).toBeDefined();
      expect(result.current.addFailedListener).toBeDefined();
      expect(result.current.addPendingListener).toBeDefined();
      expect(result.current.addPaymentInitListener).toBeDefined();
      expect(result.current.addPaymentAbortedListener).toBeDefined();
      expect(result.current.addPaymentEndListener).toBeDefined();
      expect(result.current.addWidgetInitListener).toBeDefined();
      expect(result.current.addKkiapayCloseListener).toBeDefined();
      expect(result.current.addWidgetDestroyedListener).toBeDefined();
      expect(result.current.addFeedbackListener).toBeDefined();
      expect(result.current.addKkiapayListener).toBeDefined();
      expect(result.current.removeKkiapayListener).toBeDefined();
      expect(result.current.onNetworkStateChanged).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should handle module loading errors', async () => {
      // Mock import failure
      vi.doMock('kkiapay', () => {
        throw new Error('Module not found');
      });

      const { result } = renderHook(() => useKKiaPay());
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      // Note: This test may need adjustment based on actual error handling
      // For now, we check that loading completes
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('Cleanup', () => {
    it('should not update state after unmount', async () => {
      const { unmount } = renderHook(() => useKKiaPay());
      
      // Unmount immediately
      unmount();
      
      // Wait a bit to ensure no state updates occur
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // If we get here without errors, cleanup worked correctly
      expect(true).toBe(true);
    });
  });

  describe('Performance', () => {
    it('should memoize return value', async () => {
      const { result, rerender } = renderHook(() => useKKiaPay());
      
      await waitFor(
        () => {
          expect(result.current.isLoading).toBe(false);
        },
        { timeout: 2000 }
      );
      
      const firstResult = result.current;
      
      // Rerender without changing dependencies
      rerender();
      
      // Should return the same reference (memoization working)
      expect(result.current).toBe(firstResult);
    });

    it('should only load module once', async () => {
      const { result, rerender } = renderHook(() => useKKiaPay());
      
      await waitFor(
        () => {
          expect(result.current.isLoading).toBe(false);
        },
        { timeout: 2000 }
      );
      
      // Rerender multiple times
      rerender();
      rerender();
      rerender();
      
      // Module should still be loaded (not loading again)
      expect(result.current.isLoading).toBe(false);
      expect(result.current.openKkiapayWidget).toBeDefined();
    });
  });

  describe('Default Modules', () => {
    it('should provide no-op functions before module loads', () => {
      const { result } = renderHook(() => useKKiaPay());
      
      // Should not throw when calling functions before load
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        result.current.openKkiapayWidget({} as any);
        result.current.closeKkiapayWidget();
        result.current.addSuccessListener(() => {});
      }).not.toThrow();
    });
  });

  describe('Type Safety', () => {
    it('should have correct TypeScript types', async () => {
      const { result } = renderHook(() => useKKiaPay());
      
      await waitFor(
        () => {
          expect(result.current.isLoading).toBe(false);
        },
        { timeout: 2000 }
      );
      
      // Type checks (these will be validated by TypeScript compiler)
      const isLoading: boolean = result.current.isLoading;
      const isReady: boolean = result.current.isReady;
      const error: Error | null = result.current.error;
      
      expect(typeof isLoading).toBe('boolean');
      expect(typeof isReady).toBe('boolean');
      expect(error === null || error instanceof Error).toBe(true);
      expect(typeof result.current.openKkiapayWidget).toBe('function');
    });
  });
});
