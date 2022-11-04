import {
  Fee,
  MsgSend,
  SyncTxBroadcastResult
} from '@terra-money/terra.js';
import {
  createLCDClient,
  CreateTxFailed,
  SignResult,
  Timeout,
  TxFailed,
  TxUnspecifiedError,
  useConnectedWallet,
  UserDenied,
} from '@terra-money/wallet-provider';
import {
  useCallback,
  useState
} from 'react';

const TEST_TO_ADDRESS = 'terra1k3y6ujl8q2jddn3r83f96see4etdl4hdhc3ucw';

const SignSample = () => {
  const [signResult, setSignResult] = useState<SignResult | null>(null);
  const [txResult, setTxResult] = useState<SyncTxBroadcastResult | null>(null);
  const [txError, setTxError] = useState<string | null>(null);

  const connectedWallet = useConnectedWallet();

  const send = useCallback(() => {
    if (!connectedWallet) {
      return;
    }

    setSignResult(null);
    setTxResult(null);
    setTxError(null);

    connectedWallet
      .sign({
        fee: new Fee(1000000, '200000uusd'),
        msgs: [
          new MsgSend(connectedWallet.walletAddress, TEST_TO_ADDRESS, {
            uusd: 1000000
          })
        ]
      })
      .then((nextSignResult: SignResult) => {
        console.log('[send] nextSignResult => ', nextSignResult);
        setSignResult(nextSignResult);

        // Broadcast
        const tx = nextSignResult.result;

        const lcd = createLCDClient({ network: connectedWallet.network });

        return lcd.tx.broadcastSync(tx);
      })
      .then((nextTxResult: SyncTxBroadcastResult) => {
        console.log('[send] nextTxResult => ', nextTxResult);
        setTxResult(nextTxResult);
      })
      .catch((error: unknown) => {
        if (error instanceof UserDenied) {
          setTxError('User Denied');
        } else if (error instanceof CreateTxFailed) {
          setTxError('Create Tx Failed: ' + error.message);
        } else if (error instanceof TxFailed) {
          setTxError('Tx Failed: ' + error.message);
        } else if (error instanceof Timeout) {
          setTxError('Timeout');
        } else if (error instanceof TxUnspecifiedError) {
          setTxError('Unspecified Error: ' + error.message);
        } else {
          setTxError('Unknown Error: ' + (error instanceof Error ? error.message : String(error)));
        }
      });
  }, [connectedWallet]);

  return (
    <div>
      <h1>Sign Sample</h1>
      {connectedWallet?.availableSign &&
        !signResult &&
        !txResult &&
        !txError && (
          <button onClick={() => send()}>Send 1USD to {TEST_TO_ADDRESS}</button>
        )}
      {txError && <pre>{txError}</pre>}
      {(!!signResult || !!txResult || !!txError) && (
        <button
          onClick={() => {
            setSignResult(null);
            setTxResult(null);
            setTxError(null);
          }}
        >
          Clear result
        </button>
      )}
      {!connectedWallet && <p>Wallet not connected!</p>}
      {connectedWallet && !connectedWallet.availableSign && (
        <p>This connection does not support sign()</p>
      )}
    </div>
  );
};

export default SignSample;