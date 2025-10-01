# Terra Money Wallet Provider Next.js Demo

[![Next.js](https://img.shields.io/badge/Next.js-12.0.9-black)](https://nextjs.org/)
[![Terra.js](https://img.shields.io/badge/Terra.js-3.1.6-blue)](https://terra.money/)
[![React](https://img.shields.io/badge/React-17.0.2-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.4.4-blue)](https://www.typescriptlang.org/)

A comprehensive Next.js demonstration application showcasing Terra Money wallet integration, blockchain transactions, and DeFi functionality. This project serves as a practical guide for developers building Terra-based decentralized applications (dApps).

## 🚀 Features

### Core Wallet Functionality
- **Multi-Wallet Support**: Connect with Terra Station, Leap Wallet, and other compatible wallets
- **Network Management**: Switch between mainnet and testnet environments
- **Wallet Status Monitoring**: Real-time connection status and wallet information

### Blockchain Operations
- **Transaction Processing**: Send tokens with customizable fees and gas settings
- **Query Operations**: Query account balances, token information, and blockchain data
- **Message Signing**: Sign arbitrary messages and transaction data
- **IBC Transfers**: Cross-chain token transfers using Inter-Blockchain Communication

### DeFi Integration
- **CW20 Token Support**: Manage and interact with Terra's smart contract tokens
- **Token Management**: Add, remove, and track CW20 tokens in your wallet
- **Cross-Chain Assets**: Handle IBC-wrapped assets like USDC from Axelar

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 12 with React 17
- **Blockchain SDK**: Terra.js 3.1.6 for Terra blockchain interaction
- **Wallet Integration**: Terra Money Wallet Provider 3.6.5
- **Styling**: Styled Components for component-based styling
- **Language**: TypeScript for type-safe development
- **Package Manager**: Yarn for dependency management

## 📦 Installation

### Prerequisites
- Node.js 14.x or higher
- Yarn package manager
- Terra Station wallet browser extension

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/terra-money-wallet-provider-nextjs-demo.git
   cd terra-money-wallet-provider-nextjs-demo
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Start development server**
   ```bash
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:4300` to view the application

## 🎯 Usage Examples

### Wallet Connection
```typescript
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';

const ConnectSample = () => {
  const { status, connect, disconnect } = useWallet();
  
  return (
    <div>
      {status === WalletStatus.WALLET_NOT_CONNECTED && (
        <button onClick={() => connect('EXTENSION')}>
          Connect Wallet
        </button>
      )}
      {status === WalletStatus.WALLET_CONNECTED && (
        <button onClick={disconnect}>Disconnect</button>
      )}
    </div>
  );
};
```

### Query Account Balance
```typescript
import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';

const QuerySample = () => {
  const lcd = useLCDClient();
  const connectedWallet = useConnectedWallet();
  
  useEffect(() => {
    if (connectedWallet) {
      lcd.bank.balance(connectedWallet.walletAddress)
        .then(([coins]) => setBalance(coins.toString()));
    }
  }, [connectedWallet, lcd]);
  
  return <div>{balance && <pre>{balance}</pre>}</div>;
};
```

### Send Transaction
```typescript
import { MsgSend, Fee } from '@terra-money/terra.js';

const TxSample = () => {
  const connectedWallet = useConnectedWallet();
  
  const sendTokens = () => {
    connectedWallet.post({
      fee: new Fee(600000, { uluna: 600000 }),
      msgs: [
        new MsgSend(
          connectedWallet.walletAddress,
          'recipient_address',
          { uluna: 1000000 }
        )
      ]
    });
  };
  
  return <button onClick={sendTokens}>Send Tokens</button>;
};
```

## 🔧 Available Scripts

- `yarn dev` - Start development server on port 4300
- `yarn build` - Build the application for production
- `yarn start` - Start production server
- `yarn type-check` - Run TypeScript type checking

## 📁 Project Structure

```
├── components/                 # React components
│   ├── ConnectSample/         # Wallet connection examples
│   ├── QuerySample/          # Blockchain query examples
│   ├── TxSample/             # Transaction examples
│   ├── SignSample/           # Message signing examples
│   ├── CW20TokensSample/     # CW20 token management
│   ├── NetworkSample/        # Network switching examples
│   └── IBCTransferSample/    # Cross-chain transfer examples
├── pages/                    # Next.js pages
│   ├── _app.tsx             # App wrapper with wallet provider
│   ├── _document.tsx        # Document customization
│   └── index.tsx            # Main demo page
├── package.json             # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## 🌐 Supported Networks

- **Mainnet**: Columbus-5 (Terra Classic)
- **Testnet**: Bombay-12
- **Custom Networks**: Configurable via wallet provider

## 🔗 Supported Wallets

- **Terra Station**: Official Terra wallet browser extension
- **Leap Wallet**: Multi-chain wallet with Terra support
- **WalletConnect**: Mobile wallet connections
- **Other Compatible Wallets**: Any wallet implementing Terra wallet standards

## 🚨 Error Handling

The application includes comprehensive error handling for common blockchain scenarios:

- **User Denied**: User cancels transaction or connection
- **Create Tx Failed**: Transaction creation errors
- **Tx Failed**: Transaction execution failures
- **Timeout**: Network timeout errors
- **Unspecified Errors**: Generic error handling

## 🔒 Security Considerations

- Always verify transaction details before signing
- Use testnet for development and testing
- Implement proper error handling for production
- Validate wallet connections and network states
- Handle private key security according to best practices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Useful Links

- [Terra Money Documentation](https://docs.terra.money/)
- [Terra.js SDK](https://terra-money.github.io/terra.js/)
- [Terra Station Wallet](https://station.terra.money/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Terra Money Documentation](https://docs.terra.money/)
2. Review the [Terra.js API Reference](https://terra-money.github.io/terra.js/)
3. Open an issue in this repository
4. Join the [Terra Discord Community](https://discord.gg/terra)

## 🏷️ Keywords

Terra, Terra Money, Terra.js, Wallet Provider, Next.js, React, TypeScript, Blockchain, DeFi, dApp, Smart Contracts, CW20, IBC, Cross-chain, Wallet Integration, Terra Station, Leap Wallet, Cryptocurrency, Web3, Decentralized Applications

---

**Built with ❤️ for the Terra ecosystem**