// ray test touch <
import {
  ConnectType,
  useWallet,
  WalletStatus
} from '@terra-money/wallet-provider';

const EXTENSION_TYPE = 'EXTENSION';
const TERRA_STATION_WALLET_IDENTIFIER = 'station';
const LEAP_WALLET_IDENTIFIER = 'leap-wallet';

const ConnectSample = () => {
  const {
    status,
    network,
    wallets,
    availableConnectTypes,
    availableInstallTypes,
    availableConnections,
    supportFeatures,
    connect,
    disconnect,
  } = useWallet();

  console.log('[ConnectSample] status', status);
  console.log('[ConnectSample] network', network);
  console.log('[ConnectSample] wallets', wallets);
  console.log('[ConnectSample] supportFeatures', supportFeatures);
  console.log('[ConnectSample] availableConnectTypes', availableConnectTypes);
  console.log('[ConnectSample] availableInstallTypes', availableInstallTypes);
  console.log('[ConnectSample] availableConnections', availableConnections);

  const extensionConnect = availableConnectTypes[0];

  return (
    <div>
      <h1>Connect Sample</h1>
      <div
        style={{
          display: 'flex',
          gap: 8
        }}>
        {status === WalletStatus.WALLET_NOT_CONNECTED && (
          <>
            <button onClick={() => connect(extensionConnect)}>
              Connect {extensionConnect}
            </button>
            <button onClick={() => connect(EXTENSION_TYPE as ConnectType, TERRA_STATION_WALLET_IDENTIFIER)}>
              Terra Station Wallet [{TERRA_STATION_WALLET_IDENTIFIER}]
            </button>
            <button onClick={() => connect(EXTENSION_TYPE as ConnectType, TERRA_STATION_WALLET_IDENTIFIER)}>
              Leap Wallet [{LEAP_WALLET_IDENTIFIER}]
            </button>
          </>
        )}
        {status === WalletStatus.WALLET_CONNECTED && (
          <button onClick={() => disconnect()}>Disconnect</button>
        )}
      </div>
    </div>
  );
};

export default ConnectSample;
// ray test touch >