import {
  Fee,
  MsgTransfer,
  Coin
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

const TERRA_AXL_USDC_DENOM = 'ibc/B3504E092456BA618CC28AC671A71FB08C6CA0FD0BE7C8A5B5A3E2DD933CC9E4';
const AXELAR_ACCOUNT_ADDRESS = 'axelar1umvvpydnheghmp9ly79jcxfk0s4s8c400z2c32';
const USDC_AMOUNT = 0.1;
const TERRA_TO_AXELAR_CHANNEL_ID = 'channel-6';

const IBCTransferSample = () => {
  const [txResult, setTxResult] = useState<TxResult | null>(null);
  const [txError, setTxError] = useState<string | null>(null);

  const connectedWallet = useConnectedWallet();

  const proceed = useCallback(() => {
    if (!connectedWallet) {
      return;
    }

    setTxResult(null);
    setTxError(null);

    // MEMO: inspired by https://docs.terra.money/develop/terra-js/ibc
    const transfer = new MsgTransfer(
      'transfer',
      TERRA_TO_AXELAR_CHANNEL_ID,
      new Coin(TERRA_AXL_USDC_DENOM, `${USDC_AMOUNT * Math.pow(10, 6)}`), // 10^6 amount here = 1 USDC
      connectedWallet.terraAddress,
      AXELAR_ACCOUNT_ADDRESS,
      undefined,
      (Date.now() + 60 * 1000) * 1e6
    );

    connectedWallet
      .post({
        fee: new Fee(600000, { uluna: 600000 }),
        msgs: [transfer]
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
      <h1>IBC transfer Sample</h1>
      {connectedWallet?.availablePost && !txResult && !txError && (
        <button onClick={proceed}>Send {USDC_AMOUNT} USD to {AXELAR_ACCOUNT_ADDRESS}</button>
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

export default IBCTransferSample;