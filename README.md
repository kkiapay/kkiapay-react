# kkiapay-react

## **Description**

React hook for using kkiapay

## **Installation**

```bash
npm i kkiapay-react
```

or

```bash
yarn add kkiapay-react
```

or

```bash
pnpm add kkiapay-react
```

## **How to use**

```ts
import { useEffect } from 'react';

export default function Home() {
  const { openKkiapayWidget, addSuccessListener } = useKKiaPay();

  useEffect(() => {
    addSuccessListener(({ transactionId }: { transactionId: string }) => {
      console.log(transactionId, 'transactionId');
    });
  }, [addSuccessListener]);

  const open = () => {
    openKkiapayWidget({
      amount: 1,
      key: '3425dc6035d711eca8f5b92f2997955b',
      sandbox: true,
    });
  };

  return <button onClick={open}>Pay me</button>;
}
```
