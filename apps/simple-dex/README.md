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

## 🛠 Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Web3**: wagmi, viem, RainbowKit
- **Charts**: Recharts for price visualization
- **State Management**: React hooks and context
- **Build Tools**: Vite, PostCSS, Autoprefixer

## 📦 Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd blockchain-playground/apps/simple-dex
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Set up environment variables**:

   ```bash
   cp .env.example .env.local
   ```

   Add your WalletConnect Project ID:

   ```
   VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
   ```

4. **Start the development server**:

   ```bash
   pnpm dev
   ```

5. **Open your browser** and navigate to `http://localhost:5173`

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

## 🚀 Deployment

### GitHub Pages

The project is configured for automatic deployment to GitHub Pages:

1. Push your changes to the main branch
2. GitHub Actions will automatically build and deploy
3. Access your site at `https://username.github.io/repository-name/simple-dex/`

### Manual Deployment

```bash
# Build for production
pnpm build

# Preview the build
pnpm preview

# Deploy to your hosting provider
# Upload the contents of the 'dist' folder
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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/username/repository/issues) page
2. Create a new issue with detailed information
3. Join our community Discord for real-time support

## 🎯 Roadmap

- [ ] Advanced charting with technical indicators
- [ ] Portfolio tracking and analytics
- [ ] Limit orders and advanced trading features
- [ ] Yield farming and staking
- [ ] Cross-chain bridge integration
- [ ] Mobile app development

---

Built with ❤️ using React 19 and modern Web3 technologies.
