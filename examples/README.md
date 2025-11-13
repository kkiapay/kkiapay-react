# KKiaPay React Examples

This directory contains examples demonstrating how to use kkiapay-react in different scenarios.

## Available Examples

### Basic Payment Example

Location: `./basic/App.tsx`

A complete example showing:
- Loading state handling
- Error handling with retry
- Payment initialization
- Success, failed, and pending listeners
- User-friendly UI

**Features:**
- ✅ Loading state indicator
- ✅ Error handling with retry button
- ✅ Amount input with validation
- ✅ Payment status display
- ✅ Transaction ID capture
- ✅ Responsive design

## Running the Examples

To run an example locally:

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown in the terminal (usually http://localhost:5173)

## Using Examples in Your Project

You can copy any example and adapt it to your needs. Make sure to:

1. Replace the API key with your own:
```tsx
key: 'YOUR_PUBLIC_API_KEY'
```

2. Set sandbox mode appropriately:
```tsx
sandbox: true  // For testing
sandbox: false // For production
```

3. Implement backend verification:
```tsx
addSuccessListener(({ transactionId }) => {
  // Send to your backend for verification
  fetch('/api/verify-payment', {
    method: 'POST',
    body: JSON.stringify({ transactionId }),
  });
});
```

## Example Structure

Each example follows this structure:

```tsx
import { useKKiaPay } from 'kkiapay-react';

function Example() {
  const { 
    openKkiapayWidget, 
    isLoading, 
    isReady, 
    error 
  } = useKKiaPay();

  // Handle loading state
  if (isLoading) return <Loading />;
  
  // Handle error state
  if (error) return <Error />;
  
  // Main component
  return <PaymentUI />;
}
```

## Best Practices Demonstrated

1. **Always check `isReady` before using listeners**
```tsx
useEffect(() => {
  if (isReady) {
    addSuccessListener(callback);
  }
}, [isReady, addSuccessListener]);
```

2. **Handle all payment states**
- Loading
- Error
- Success
- Failed
- Pending

3. **Provide user feedback**
- Show loading indicators
- Display error messages
- Confirm successful payments
- Allow retry on errors

4. **Validate inputs**
```tsx
const isValidAmount = amount > 0 && amount <= MAX_AMOUNT;
```

5. **Never hardcode API keys**
```tsx
const apiKey = process.env.REACT_APP_KKIAPAY_PUBLIC_KEY;
```

## Need Help?

- 📖 [Documentation](https://docs.kkiapay.me)
- 🐛 [Report Issues](https://github.com/kkiapay/kkiapay-react/issues)
- 💬 [Support](mailto:support@kkiapay.me)
