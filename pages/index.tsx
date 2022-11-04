import ConnectSample from './connect-sample';
import CW20TokensSample from './cw20-tokens-sample';
import NetworkSample from './network-sample';
import QuerySample from './query-sample';
import SignBytesSample from './sign-bytes-sample';
import SignSample from './sign-sample';
import TxSample from './tx-sample';

const Home = () => {
  return (
    <div>
      <ConnectSample />
      <QuerySample />
      <TxSample />
      <SignSample />
      <SignBytesSample />
      <CW20TokensSample />
      <NetworkSample />
    </div>
  );
};

export default Home;