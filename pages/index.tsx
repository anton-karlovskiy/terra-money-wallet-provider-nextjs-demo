import ConnectSample from 'components/ConnectSample';
import QuerySample from 'components/QuerySample';
import TxSample from 'components/TxSample';
import SignSample from 'components/SignSample';
import SignBytesSample from 'components/SignBytesSample';
import CW20TokensSample from 'components/CW20TokensSample';
import NetworkSample from 'components/NetworkSample';
import IBCTransferSample from 'components/IBCTransferSample';

const Home = () => {
  return (
    <>
      <ConnectSample />
      <QuerySample />
      <TxSample />
      <SignSample />
      <SignBytesSample />
      <CW20TokensSample />
      <NetworkSample />
      <IBCTransferSample />
    </>
  );
};

export default Home;