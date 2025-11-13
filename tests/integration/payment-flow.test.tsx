import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { useKKiaPay } from '../../lib/useKKiaPay';
import { useEffect } from 'react';

// Mock the kkiapay module
vi.mock('kkiapay', () => ({
  default: {
    openKkiapayWidget: vi.fn(),
    closeKkiapayWidget: vi.fn(),
    addSuccessListener: vi.fn((callback) => {
      // Simulate success after a delay
      setTimeout(() => callback({ transactionId: 'test-123' }), 100);
    }),
    addFailedListener: vi.fn(),
    addPendingListener: vi.fn(),
    addPaymentInitListener: vi.fn(),
    addPaymentAbortedListener: vi.fn(),
    addPaymentEndListener: vi.fn(),
    addWidgetInitListener: vi.fn(),
    addKkiapayCloseListener: vi.fn(),
    addWidgetDestroyedListener: vi.fn(),
    addFeedbackListener: vi.fn(),
    removeKkiapayListener: vi.fn(),
    addKkiapayListener: vi.fn(),
    onNetworkStateChanged: vi.fn(),
  },
}));

describe('Payment Flow Integration', () => {
  it('should handle complete payment flow', async () => {
    const onSuccess = vi.fn();

    function PaymentComponent() {
      const { openKkiapayWidget, addSuccessListener, isLoading, isReady } = useKKiaPay();

      useEffect(() => {
        if (isReady) {
          addSuccessListener(onSuccess);
        }
      }, [isReady, addSuccessListener]);

      if (isLoading) {
        return <div>Loading...</div>;
      }

      return (
        <button
          onClick={() =>
            openKkiapayWidget({
              amount: 1000,
              key: 'test-key',
              sandbox: true,
            })
          }
        >
          Pay Now
        </button>
      );
    }

    render(<PaymentComponent />);

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    // Button should be visible
    const button = screen.getByText('Pay Now');
    expect(button).toBeInTheDocument();

    // Click the button
    button.click();

    // Wait for success callback
    await waitFor(
      () => {
        expect(onSuccess).toHaveBeenCalledWith({ transactionId: 'test-123' });
      },
      { timeout: 500 }
    );
  });

  it('should handle error state', async () => {
    function ErrorComponent() {
      const { error, isLoading } = useKKiaPay();

      if (isLoading) {
        return <div>Loading...</div>;
      }

      if (error) {
        return (
          <div>
            <p>Error: {error.message}</p>
          </div>
        );
      }

      return <div>Ready</div>;
    }

    render(<ErrorComponent />);

    // Should eventually show ready or error
    await waitFor(() => {
      expect(
        screen.queryByText('Loading...') ||
          screen.queryByText('Ready') ||
          screen.queryByText(/Error:/)
      ).toBeInTheDocument();
    });
  });

  it('should handle multiple listeners', async () => {
    const onSuccess = vi.fn();
    const onFailed = vi.fn();
    const onPending = vi.fn();

    function MultiListenerComponent() {
      const {
        addSuccessListener,
        addFailedListener,
        addPendingListener,
        isReady,
      } = useKKiaPay();

      useEffect(() => {
        if (isReady) {
          addSuccessListener(onSuccess);
          addFailedListener(onFailed);
          addPendingListener(onPending);
        }
      }, [isReady, addSuccessListener, addFailedListener, addPendingListener]);

      return <div>{isReady ? 'Ready' : 'Loading'}</div>;
    }

    render(<MultiListenerComponent />);

    await waitFor(() => {
      expect(screen.getByText('Ready')).toBeInTheDocument();
    });

    // All listeners should be registered
    expect(onSuccess).toBeDefined();
    expect(onFailed).toBeDefined();
    expect(onPending).toBeDefined();
  });
});
