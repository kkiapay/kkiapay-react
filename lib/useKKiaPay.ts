import { ILibrary } from 'kkiapay';
import { useEffect, useState, useMemo } from 'react';

const defaultModules: ILibrary = {
  openKkiapayWidget: () => {},
  closeKkiapayWidget: () => {},
  addSuccessListener: () => {},
  addWidgetInitListener: () => {},
  addKkiapayCloseListener: () => {},
  addWidgetDestroyedListener: () => {},
  addPaymentInitListener: () => {},
  addPaymentAbortedListener: () => {},
  addFeedbackListener: () => {},
  addPendingListener: () => {},
  addFailedListener: () => {},
  addPaymentEndListener: () => {},
  removeKkiapayListener: () => {},
  addKkiapayListener: () => {},
  onNetworkStateChanged: () => {},
};

/**
 * Extended return type for useKKiaPay hook with loading and error states
 */
export interface UseKKiaPayReturn extends ILibrary {
  /** Indicates if the KKiaPay module is currently loading */
  isLoading: boolean;
  /** Indicates if the KKiaPay module is ready to use */
  isReady: boolean;
  /** Error object if module loading failed */
  error: Error | null;
}

/**
 * React hook for integrating KKiaPay payment gateway
 *
 * @example
 * ```tsx
 * const { openKkiapayWidget, isLoading, isReady, error } = useKKiaPay();
 *
 * if (isLoading) return <div>Loading payment system...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 * if (!isReady) return null;
 *
 * return (
 *   <button onClick={() => openKkiapayWidget({
 *     amount: 1000,
 *     key: 'YOUR_KEY',
 *     sandbox: true
 *   })}>
 *     Pay Now
 *   </button>
 * );
 * ```
 *
 * @returns {UseKKiaPayReturn} KKiaPay SDK methods and state
 */
export function useKKiaPay(): UseKKiaPayReturn {
  const [modules, setModules] = useState<ILibrary>(defaultModules);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadModule = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const imported = await import('kkiapay');

        if (!cancelled) {
          // Type-safe module extraction
          const lib = 'default' in imported ? imported.default : imported;
          setModules(lib as ILibrary);
        }
      } catch (err) {
        if (!cancelled) {
          const error = err instanceof Error ? err : new Error('Failed to load KKiaPay module');
          setError(error);
          console.error('[useKKiaPay] Failed to load kkiapay module:', error);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadModule();

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      cancelled = true;
    };
  }, []);

  // Memoize the return value to prevent unnecessary re-renders
  const returnValue = useMemo(
    () => ({
      ...modules,
      isLoading,
      isReady: !isLoading && !error,
      error,
    }),
    [modules, isLoading, error]
  );

  return returnValue;
}
