# kkiapay-react

[![npm version](https://img.shields.io/npm/v/kkiapay-react.svg)](https://www.npmjs.com/package/kkiapay-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![CI](https://github.com/kkiapay/kkiapay-react/workflows/CI/badge.svg)](https://github.com/kkiapay/kkiapay-react/actions)

A modern, type-safe React hook for integrating [KKiaPay](https://kkiapay.me) payment gateway into your React applications.

## ✨ Features

- 🎣 **Simple React Hook** - Easy-to-use `useKKiaPay` hook
- 🔒 **Type-Safe** - Full TypeScript support with comprehensive types
- ⚡ **Lightweight** - Minimal bundle size with dynamic imports
- 🎯 **Zero Config** - Works out of the box
- 🔄 **Event Listeners** - Complete payment lifecycle management
- 📦 **ESM** - Modern ES Module format
- 🛡️ **Error Handling** - Built-in error handling and retry mechanism
- 🔥 **Performance** - Optimized with memoization and cleanup
- ✅ **Well Tested** - Comprehensive test coverage

## 📦 Installation

```bash
npm install kkiapay-react
```

```bash
yarn add kkiapay-react
```

```bash
pnpm add kkiapay-react
```

## 🚀 Quick Start

```tsx
import { useEffect } from 'react';
import { useKKiaPay } from 'kkiapay-react';

export default function CheckoutPage() {
  const { openKkiapayWidget, addSuccessListener, isLoading, isReady } = useKKiaPay();

  useEffect(() => {
    if (isReady) {
      addSuccessListener(({ transactionId }) => {
        console.log('Payment successful:', transactionId);
        // Verify payment on your backend
      });
    }
  }, [isReady, addSuccessListener]);

  if (isLoading) {
    return <div>Loading payment system...</div>;
  }

  const handlePayment = () => {
    openKkiapayWidget({
      amount: 1000,
      key: 'YOUR_PUBLIC_API_KEY',
      sandbox: true, // Use false in production
    });
  };

  return (
    <button onClick={handlePayment}>
      Pay 1000 XOF
    </button>
  );
}
```

## 📖 Usage

### Basic Payment

```tsx
import { useKKiaPay } from 'kkiapay-react';

function PaymentButton() {
  const { openKkiapayWidget, isReady } = useKKiaPay();

  const initiatePayment = () => {
    openKkiapayWidget({
      amount: 5000,
      key: 'YOUR_PUBLIC_API_KEY',
      sandbox: true,
      // Optional parameters
      name: 'John Doe',
      phone: '22997000000',
      email: 'john@example.com',
      reason: 'Purchase of Product X',
    });
  };

  return (
    <button onClick={initiatePayment} disabled={!isReady}>
      Pay Now
    </button>
  );
}
```

### Handling Payment Events

```tsx
import { useEffect } from 'react';
import { useKKiaPay } from 'kkiapay-react';

function PaymentComponent() {
  const {
    openKkiapayWidget,
    addSuccessListener,
    addFailedListener,
    addPendingListener,
    isReady,
  } = useKKiaPay();

  useEffect(() => {
    if (isReady) {
      // Payment successful
      addSuccessListener((data) => {
        console.log('Success:', data.transactionId);
        // Verify payment on your backend
      });

      // Payment failed
      addFailedListener((data) => {
        console.error('Payment failed:', data);
        // Show error message to user
      });

      // Payment pending (e.g., mobile money)
      addPendingListener((data) => {
        console.log('Payment pending:', data);
        // Show pending status
      });
    }
  }, [isReady, addSuccessListener, addFailedListener, addPendingListener]);

  return (
    <button onClick={() => openKkiapayWidget({ amount: 1000, key: 'YOUR_KEY', sandbox: true })}>
      Pay
    </button>
  );
}
```

### Error Handling

```tsx
import { useKKiaPay } from 'kkiapay-react';

function PaymentWithErrorHandling() {
  const { openKkiapayWidget, isLoading, error, retry } = useKKiaPay();

  if (isLoading) {
    return <div>Loading payment system...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
        <button onClick={retry}>Retry</button>
      </div>
    );
  }

  return (
    <button onClick={() => openKkiapayWidget({ amount: 1000, key: 'YOUR_KEY', sandbox: true })}>
      Pay Now
    </button>
  );
}
```

### Advanced: Widget Lifecycle

```tsx
import { useEffect } from 'react';
import { useKKiaPay } from 'kkiapay-react';

function AdvancedPayment() {
  const {
    openKkiapayWidget,
    closeKkiapayWidget,
    addWidgetInitListener,
    addKkiapayCloseListener,
    isReady,
  } = useKKiaPay();

  useEffect(() => {
    if (isReady) {
      addWidgetInitListener(() => {
        console.log('Widget initialized');
      });

      addKkiapayCloseListener(() => {
        console.log('Widget closed');
      });
    }
  }, [isReady, addWidgetInitListener, addKkiapayCloseListener]);

  return (
    <div>
      <button onClick={() => openKkiapayWidget({ amount: 2000, key: 'YOUR_KEY', sandbox: true })}>
        Open Payment
      </button>
      <button onClick={closeKkiapayWidget}>
        Close Payment
      </button>
    </div>
  );
}
```

## 🔧 API Reference

### `useKKiaPay()`

Returns an object with all KKiaPay SDK methods and state:

#### State Properties

- **`isLoading`** (boolean): Indicates if the KKiaPay module is currently loading
- **`isReady`** (boolean): Indicates if the module is loaded and ready to use
- **`error`** (Error | null): Error object if module loading failed
- **`retry`** (() => void): Function to retry loading the module after failure

#### Payment Methods

- **`openKkiapayWidget(options)`** - Opens the payment widget
  - `amount` (number, required): Amount to charge
  - `key` (string, required): Your KKiaPay public API key
  - `sandbox` (boolean, required): Use sandbox mode for testing
  - `name` (string, optional): Customer name
  - `phone` (string, optional): Customer phone number
  - `email` (string, optional): Customer email
  - `reason` (string, optional): Payment reason/description

- **`closeKkiapayWidget()`** - Programmatically closes the widget

#### Event Listeners

- **`addSuccessListener(callback)`** - Called when payment succeeds
- **`addFailedListener(callback)`** - Called when payment fails
- **`addPendingListener(callback)`** - Called when payment is pending
- **`addPaymentInitListener(callback)`** - Called when payment starts
- **`addPaymentAbortedListener(callback)`** - Called when user cancels
- **`addPaymentEndListener(callback)`** - Called when payment process ends
- **`addWidgetInitListener(callback)`** - Called when widget initializes
- **`addKkiapayCloseListener(callback)`** - Called when widget closes
- **`addWidgetDestroyedListener(callback)`** - Called when widget is destroyed
- **`addFeedbackListener(callback)`** - Called for feedback events
- **`addKkiapayListener(event, callback)`** - Generic event listener
- **`removeKkiapayListener(event)`** - Removes a specific listener
- **`onNetworkStateChanged(callback)`** - Called on network state changes

## 🔑 Getting Your API Keys

1. Sign up at [KKiaPay Dashboard](https://kkiapay.me)
2. Navigate to Settings → API Keys
3. Copy your **Public Key** (never use your private key in frontend code)
4. Use `sandbox: true` for testing, `sandbox: false` for production

## 🛡️ Security Best Practices

- ✅ **Always verify payments on your backend** using KKiaPay's API
- ✅ Use environment variables for API keys
- ✅ Never expose your private/secret key in frontend code
- ✅ Implement proper error handling
- ✅ Use HTTPS in production

See [SECURITY.md](./SECURITY.md) for detailed security guidelines.

## 🧪 Testing

Use sandbox mode for testing:

```tsx
openKkiapayWidget({
  amount: 100,
  key: 'YOUR_PUBLIC_KEY',
  sandbox: true, // Enable sandbox mode
});
```

Test cards and mobile money numbers are available in [KKiaPay documentation](https://docs.kkiapay.me).

## 📚 Examples

Check out the [examples](./examples) directory for complete working examples:

- [Basic Payment](./examples/basic/App.tsx) - Simple payment integration
- More examples coming soon!

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a list of changes.

## 📄 License

MIT © [KKiaPay](https://kkiapay.me) - see [LICENSE](./LICENSE) file for details.

## 🔗 Links

- [KKiaPay Website](https://kkiapay.me)
- [KKiaPay Documentation](https://docs.kkiapay.me)
- [KKiaPay Dashboard](https://dashboard.kkiapay.me)
- [Report Issues](https://github.com/kkiapay/kkiapay-react/issues)
- [NPM Package](https://www.npmjs.com/package/kkiapay-react)

## 💬 Support

For support:
- 📧 Email: support@kkiapay.me
- 🐛 Issues: [GitHub Issues](https://github.com/kkiapay/kkiapay-react/issues)
- 📖 Documentation: [docs.kkiapay.me](https://docs.kkiapay.me)

---

Made with ❤️ by the KKiaPay team
