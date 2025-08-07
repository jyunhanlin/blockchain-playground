# Crypto Wallet

A comprehensive multi-chain crypto wallet with MetaMask integration, featuring real-time balance tracking, multi-chain support, and seamless transaction capabilities.

## Features

- **🔗 MetaMask Integration**: Seamless connection with MetaMask and other Web3 wallets
- **💰 Balance Tracking**: Real-time crypto balance display and portfolio overview
- **🔄 Multi-chain Support**: Support for Ethereum, Polygon, and their testnets
- **💸 Transfer Functionality**: Send transactions with real-time confirmation
- **📱 Responsive Design**: Modern UI built with shadcn/ui and Tailwind CSS
- **⚡ Fast Development**: Built with Vite and React 19

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Web3**: Wagmi v2, Viem, Ethers.js
- **UI**: shadcn/ui, Tailwind CSS, Lucide React
- **State Management**: TanStack Query, Zustand

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

## Development Notes

- Uses React 19 with the latest features and patterns
- Wagmi v2 provides type-safe Web3 interactions
- All components are built with accessibility in mind
- The UI follows modern design principles
- Built with Vite for fast development and hot reloading

## Deployment

The app is automatically deployed via GitHub Actions when changes are made to the `apps/crypto-wallet/` directory. The built files are deployed to GitHub Pages.

### Manual Build

```bash
# Build for production
pnpm build

# The built files will be in dist/
```

## Contributing

When contributing to this app:

1. Follow the existing code style and patterns
2. Ensure all components are accessible
3. Add proper TypeScript types
4. Test on multiple chains and wallets
5. Update documentation as needed

## License

This project is part of the blockchain-playground monorepo and is licensed under the MIT License.
