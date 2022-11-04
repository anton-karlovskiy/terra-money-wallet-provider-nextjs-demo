import {
  useWallet,
  WalletStatus
} from '@terra-money/use-wallet'
import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'

const TEST_NETWORK: any = {
  name: 'test-network',
  chainID: 'bombay-12',
  lcd: 'https://lcd.terra.dev'
} as any

function Component(): JSX.Element {
  const { hasNetwork, addNetwork } = useWallet()

  const [networkExists, setNetworkExists] = useState<
    'exists' | 'not exists' | null
  >(null)

  const availableAdd = useMemo(
    () => networkExists === 'not exists',
    [networkExists]
  )

  useEffect(() => {
    hasNetwork(TEST_NETWORK).then((result) =>
      setNetworkExists(result ? 'exists' : 'not exists')
    )
  }, [hasNetwork])

  const add = useCallback(() => {
    addNetwork(TEST_NETWORK).then((result) =>
      setNetworkExists(result ? 'exists' : 'not exists')
    )
  }, [addNetwork])

  return (
    <div>
      <pre>Network exists: {networkExists}</pre>
      {availableAdd && <button onClick={add}>Add network</button>}
    </div>
  );
}

const NetworkSample = (): JSX.Element => {
  const { status, supportFeatures } = useWallet();

  return (
    <div>
      <h1>Network Sample</h1>
      {supportFeatures.has('network') ? (
        <Component />
      ) : status === WalletStatus.WALLET_CONNECTED ? (
        <p>This connection does not support Network commands</p>
      ) : (
        <p>Wallet not connected!</p>
      )}
    </div>
  );
};

export default NetworkSample;