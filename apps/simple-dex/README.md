# Simple DEX - Decentralized Exchange

A modern, user-friendly decentralized exchange (DEX) built with React 19, TypeScript, and Web3 technologies. Features token swapping, liquidity provision, real-time price updates, and smart contract integration.

## 🚀 Features

### Core Trading Features

- **Token Swapping**: Uniswap-style token exchange with automated market making
- **Price Calculation**: Real-time price discovery and slippage calculation
- **Liquidity Pools**: Add/remove liquidity and earn trading fees
- **Price Impact Analysis**: Visual indicators for trade impact on pool prices

### User Experience

- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Real-time Updates**: Live price feeds and transaction status
- **Multi-chain Support**: Works across Ethereum, Polygon, Arbitrum, and Optimism
- **Responsive Design**: Optimized for desktop and mobile devices

### Web3 Integration

- **Wallet Connection**: RainbowKit integration with multiple wallet support
- **Smart Contract Integration**: Direct interaction with Uniswap V2-style contracts
- **Chain Switching**: Seamless network switching
- **Transaction Management**: Comprehensive transaction state handling

## 📦 Installation

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Set up environment variables**:

   ```bash
   cp .env.example .env.local
   ```

   Add your WalletConnect Project ID:

   ```
   VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
   ```

3. **Start the development server**:

   ```bash
   pnpm dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## 🏗 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui base components
│   ├── SwapInterface.tsx    # Token swapping interface
│   ├── LiquidityInterface.tsx # Liquidity management
│   ├── PriceChart.tsx       # Price visualization
│   ├── TokenSelect.tsx      # Token selection dropdown
│   ├── PriceImpactDisplay.tsx # Price impact indicator
│   └── WalletConnect.tsx    # Wallet connection
├── lib/                # Utility functions and configs
│   ├── utils.ts        # Helper functions
│   ├── chains.ts       # Blockchain configurations
│   └── wagmi.ts        # Web3 configuration
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🔧 Configuration

### Supported Networks

The DEX supports the following networks:

- Ethereum Mainnet
- Ethereum Sepolia (Testnet)
- Polygon
- Arbitrum
- Optimism

### Token Configuration

Tokens are configured in `src/lib/chains.ts`. You can add custom tokens by updating the `MOCK_TOKENS` object:

```typescript
export const MOCK_TOKENS = {
  [chainId]: [
    {
      address: '0x...',
      symbol: 'TOKEN',
      name: 'Token Name',
      decimals: 18,
      logoURI: 'https://...',
    },
  ],
};
```

### Smart Contract Addresses

Contract addresses for different networks are defined in `src/lib/wagmi.ts`:

```typescript
export const CONTRACT_ADDRESSES = {
  [chainId]: {
    router: '0x...',
    factory: '0x...',
  },
};
```

## 🔒 Security Considerations

- **Smart Contract Audits**: Always verify contract addresses before deployment
- **Input Validation**: All user inputs are validated and sanitized
- **Slippage Protection**: Users can set custom slippage tolerance
- **Price Impact Warnings**: Visual indicators for high-impact trades

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run linting
pnpm lint

# Type checking
pnpm type-check
```

## 🎯 Roadmap

- [ ] Advanced charting with technical indicators
- [ ] Portfolio tracking and analytics
- [ ] Limit orders and advanced trading features
- [ ] Yield farming and staking
- [ ] Cross-chain bridge integration
- [ ] Mobile app development
