# Crypto Wallet

A comprehensive multi-chain crypto wallet with MetaMask integration, featuring real-time balance tracking, multi-chain support, and seamless transaction capabilities.

## Features

- **🔗 MetaMask Integration**: Seamless connection with MetaMask and other Web3 wallets
- **💰 Balance Tracking**: Real-time crypto balance display and portfolio overview
- **🔄 Multi-chain Support**: Support for Ethereum, Polygon, and their testnets
- **💸 Transfer Functionality**: Send transactions with real-time confirmation
- **📱 Responsive Design**: Modern UI built with shadcn/ui and Tailwind CSS
- **⚡ Fast Development**: Built with Vite and React 19

## Quick Start

### Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm --filter crypto-wallet dev

# Build for production
pnpm --filter crypto-wallet build
```

## Project Structure

```
crypto-wallet/
├── src/
│   ├── components/     # React components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── BalanceCard.tsx
│   │   ├── ChainSwitcher.tsx
│   │   ├── TransferForm.tsx
│   │   └── WalletConnect.tsx
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utilities and configurations
│   │   ├── chains.ts   # Chain configurations
│   │   ├── utils.ts    # Utility functions
│   │   └── wagmi.ts    # Wagmi configuration
│   ├── stores/         # State management
│   ├── types/          # TypeScript definitions
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── index.html
```

## Features Detail

### Wallet Connection

- Connect with MetaMask and other injected wallets
- Automatic wallet detection and connection handling
- Support for wallet switching and account changes

### Balance Display

- View native token balances across supported chains
- Real-time balance updates
- Portfolio overview with USD values

### Chain Switching

- Easy network switching between supported chains
- Automatic chain detection and prompting
- Support for adding custom networks

### Send Transactions

- Transfer tokens with transaction confirmation
- Gas estimation and fee display
- Transaction status tracking
- Error handling and user feedback

### Responsive Design

- Works perfectly on desktop and mobile devices
- Modern UI with dark/light mode support
- Accessible components following WCAG guidelines

## Supported Networks

- **Ethereum Mainnet** (Chain ID: 1)
- **Polygon Mainnet** (Chain ID: 137)
- **Sepolia Testnet** (Chain ID: 11155111)
- **Mumbai Testnet** (Chain ID: 80001)
