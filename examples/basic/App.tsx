import { useEffect, useState } from 'react';
import { useKKiaPay } from '../../lib/useKKiaPay';

export default function App() {
  const {
    openKkiapayWidget,
    addSuccessListener,
    addFailedListener,
    addPendingListener,
    isLoading,
    isReady,
    error,
  } = useKKiaPay();

  const [amount, setAmount] = useState(1000);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string>('');

  useEffect(() => {
    if (isReady) {
      // Setup payment listeners
      addSuccessListener(({ transactionId }) => {
        console.log('Payment successful:', transactionId);
        setTransactionId(transactionId);
        setPaymentStatus('success');
      });

      addFailedListener((data) => {
        console.error('Payment failed:', data);
        setPaymentStatus('failed');
      });

      addPendingListener((data) => {
        console.log('Payment pending:', data);
        setPaymentStatus('pending');
      });
    }
  }, [isReady, addSuccessListener, addFailedListener, addPendingListener]);

  const handlePayment = () => {
    setPaymentStatus('');
    setTransactionId(null);

    openKkiapayWidget({
      amount,
      key: '3425dc6035d711eca8f5b92f2997955b', // Replace with your public key
      sandbox: true, // Set to false in production
      name: 'John Doe',
      phone: '22997000000',
      email: 'john@example.com',
      reason: 'Test Payment',
    });
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1>Loading Payment System...</h1>
          <div style={styles.loader}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={{ color: '#e74c3c' }}>Error Loading Payment System</h1>
          <p style={{ color: '#7f8c8d' }}>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>KKiaPay React Demo</h1>
        <p style={styles.subtitle}>Test the payment integration</p>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Amount (XOF)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            style={styles.input}
            min="100"
            step="100"
          />
        </div>

        <button onClick={handlePayment} style={styles.button} disabled={!isReady}>
          Pay {amount} XOF
        </button>

        {paymentStatus && (
          <div
            style={{
              ...styles.status,
              backgroundColor:
                paymentStatus === 'success'
                  ? '#d4edda'
                  : paymentStatus === 'failed'
                  ? '#f8d7da'
                  : '#fff3cd',
              color:
                paymentStatus === 'success'
                  ? '#155724'
                  : paymentStatus === 'failed'
                  ? '#721c24'
                  : '#856404',
            }}
          >
            <strong>Status:</strong> {paymentStatus.toUpperCase()}
            {transactionId && (
              <>
                <br />
                <strong>Transaction ID:</strong> {transactionId}
              </>
            )}
          </div>
        )}

        <div style={styles.info}>
          <h3>Test Information</h3>
          <ul style={styles.list}>
            <li>This is a sandbox environment</li>
            <li>No real money will be charged</li>
            <li>Use test credentials from KKiaPay documentation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '20px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '40px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '28px',
    color: '#2c3e50',
  },
  subtitle: {
    margin: '0 0 32px 0',
    fontSize: '16px',
    color: '#7f8c8d',
  },
  inputGroup: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#2c3e50',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
  },
  button: {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    fontWeight: 600,
    color: 'white',
    backgroundColor: '#3498db',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  status: {
    marginTop: '24px',
    padding: '16px',
    borderRadius: '8px',
    fontSize: '14px',
  },
  info: {
    marginTop: '32px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  list: {
    margin: '8px 0 0 0',
    paddingLeft: '20px',
    fontSize: '14px',
    color: '#7f8c8d',
  },
  loader: {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
    margin: '20px auto',
  },
};
