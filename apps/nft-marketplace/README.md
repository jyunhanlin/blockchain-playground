# NFT Marketplace

A modern, full-featured NFT marketplace built with React 19, TypeScript, and Web3 technologies.

## Features

- 🎨 **NFT Gallery** - Browse and discover unique digital art
- 🛒 **Buy/Sell Functionality** - Trade NFTs with ease
- 🔨 **NFT Minting** - Create and mint your own NFTs
- 👤 **User Profiles** - Manage your NFT collection
- 🌐 **IPFS Integration** - Decentralized storage for NFT metadata
- 🏛️ **Auction System** - Bid on exclusive NFTs
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🔗 **Wallet Integration** - Connect with MetaMask, WalletConnect, and more

## Getting Started

### Installation

1. Install dependencies:

```bash
pnpm install
```

3. Create environment variables:

```bash
cp .env.example .env.local
```

Add your environment variables:

```env
VITE_INFURA_PROJECT_ID=your_infura_project_id
VITE_INFURA_PROJECT_SECRET=your_infura_project_secret
VITE_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
```

4. Start the development server:

```bash
pnpm dev
```

## Environment Setup

### IPFS Configuration

This project uses Infura's IPFS service for decentralized storage:

1. Sign up at [Infura](https://infura.io/)
2. Create a new IPFS project
3. Add your project ID and secret to the environment variables

### Wallet Connect

For WalletConnect integration:

1. Sign up at [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create a new project
3. Add your project ID to the environment variables

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── nft/             # NFT-specific components
│   └── WalletConnect.tsx
├── pages/
│   ├── Home.tsx         # Homepage with featured NFTs
│   ├── Create.tsx       # NFT creation page
│   └── Profile.tsx      # User profile page
├── lib/
│   ├── chains.ts        # Blockchain configurations
│   ├── wagmi.ts         # Wagmi configuration
│   ├── ipfs.ts          # IPFS utilities
│   └── utils.ts         # Helper functions
├── types/
│   └── index.ts         # TypeScript type definitions
└── hooks/               # Custom React hooks
```

## Features in Detail

### NFT Gallery

- Grid and list view options
- Search and filter functionality
- Sort by price, date, name
- Filter by sale status

### NFT Creation

- Upload images (PNG, JPG, GIF, SVG)
- Add metadata and attributes
- Set pricing and sale options
- IPFS integration for decentralized storage

### User Profiles

- Display owned and created NFTs
- Social links integration
- Verified user badges
- Portfolio statistics

### Marketplace Features

- Buy NFTs instantly
- Auction system with bidding
- Price history tracking
- Collection management

## Smart Contract Integration

The marketplace is designed to work with ERC-721 NFT contracts. Key functions include:

- `mintNFT()` - Mint new NFTs
- `setApprovalForAll()` - Approve marketplace for transfers
- `transferFrom()` - Transfer NFT ownership
- `tokenURI()` - Get NFT metadata URI

## Roadmap

- [ ] Advanced search and filtering
- [ ] Collection creation and management
- [ ] Royalty system for creators
- [ ] Multi-chain support
- [ ] Mobile app development
- [ ] API integration for external platforms
