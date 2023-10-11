import { ILibrary } from 'kkiapay/dist/src/typings';
import { useEffect, useState } from 'react';

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

export function useKKiaPay() {
  const [modules, setModules] = useState<ILibrary>(defaultModules);

  useEffect(() => {
    const loadModule = async () => {
      const _modules = await import('kkiapay');
      setModules(_modules);
    };
    loadModule();
  }, []);

  return modules;
}
