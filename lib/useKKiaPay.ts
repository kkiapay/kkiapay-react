import { ILibrary } from "@kkiapay-org/js-sdk";
import { useEffect, useState } from "react";

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
      const imported = await import("@kkiapay-org/js-sdk");
      const lib = (imported as any).default ?? imported;
      setModules(lib as ILibrary);
    };
    loadModule();
  }, []);
  return modules;
}
