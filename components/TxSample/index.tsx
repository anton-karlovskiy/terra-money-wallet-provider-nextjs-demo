// ray test touch <
import {
  Fee,
  MsgSend
} from '@terra-money/terra.js';
import {
  CreateTxFailed,
  Timeout,
  TxFailed,
  TxResult,
  TxUnspecifiedError,
  useConnectedWallet,
  UserDenied,
} from '@terra-money/wallet-provider';
import {
  useCallback,
  useState
} from 'react';

const TEST_TO_ADDRESS = 'terra1k3y6ujl8q2jddn3r83f96see4etdl4hdhc3ucw';
const TERRA_AXL_USDC_DENOM = 'ibc/B3504E092456BA618CC28AC671A71FB08C6CA0FD0BE7C8A5B5A3E2DD933CC9E4';

const TxSample = () => {
  const [txResult, setTxResult] = useState<TxResult | null>(null);
  const [txError, setTxError] = useState<string | null>(null);

  const connectedWallet = useConnectedWallet();

  const proceed = useCallback(() => {
    if (!connectedWallet) {
      return;
    }

    setTxResult(null);
    setTxError(null);

    connectedWallet
      .post({
        fee: new Fee(600000, { uluna: 600000 }),
        msgs: [
          new MsgSend(connectedWallet.walletAddress, TEST_TO_ADDRESS, {
            [TERRA_AXL_USDC_DENOM]: 1000000, // 1 USDC vs. 6 decimals
          }),
        ],
      })
      .then((nextTxResult: TxResult) => {
        console.log('[proceed] nextTxResult => ', nextTxResult);
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
      <h1>Tx Sample</h1>
      {connectedWallet?.availablePost && !txResult && !txError && (
        <button onClick={proceed}>Send 1USD to {TEST_TO_ADDRESS}</button>
      )}
      {txError && <pre>{txError}</pre>}
      {(!!txResult || !!txError) && (
        <button
          onClick={() => {
            setTxResult(null);
            setTxError(null);
          }}
        >
          Clear result
        </button>
      )}
      {!connectedWallet && <p>Wallet not connected!</p>}
      {connectedWallet && !connectedWallet.availablePost && (
        <p>This connection does not support post()</p>
      )}
    </div>
  );
};

export default TxSample;
// ray test touch >