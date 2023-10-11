import { useKKiaPay } from '../lib/useKKiaPay';

export function App() {
  const kkiapay = useKKiaPay();

  const openWidget = () => {
    kkiapay?.openKkiapayWidget({
      key: 'LprYUAyMpfAjq4z2yTHPiY0b6XktIQ',
      amount: 1,
    });
  };

  return (
    <div>
      App <button onClick={openWidget}>Click me</button>{' '}
    </div>
  );
}
