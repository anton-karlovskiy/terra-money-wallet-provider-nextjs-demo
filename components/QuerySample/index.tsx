import {
  useConnectedWallet,
  useLCDClient
} from '@terra-money/wallet-provider';
import {
  useEffect,
  useState
} from 'react';

const QuerySample = () => {
  const lcd = useLCDClient();
  const connectedWallet = useConnectedWallet();

  const [bank, setBank] = useState<null | string>();

  useEffect(() => {
    if (connectedWallet) {
      lcd.bank.balance(connectedWallet.walletAddress).then(([coins]) => {
        console.log('[QuerySample useEffect] coins => ', coins);
        setBank(coins.toString());
      });
    } else {
      setBank(null);
    }
  }, [connectedWallet, lcd]);

  return (
    <div>
      <h1>Query Sample</h1>
      {bank && <pre>{bank}</pre>}
      {!connectedWallet && <p>Wallet not connected!</p>}
    </div>
  );
};

export default QuerySample;