# DeFi Yield Aggregator

A comprehensive DeFi yield farming dashboard that helps users discover, track, and optimize their yield farming strategies across multiple protocols.

## 🌟 Features

### 📊 Yield Rate Display

- Real-time APY/APR tracking across major DeFi protocols
- Protocol comparison with detailed metrics
- Historical yield performance charts
- Multi-protocol yield aggregation

### 💼 Portfolio Tracking

- Comprehensive portfolio overview with P&L tracking
- Position management across multiple pools
- Real-time value updates and performance metrics
- Portfolio allocation visualization

### 🤖 Auto-Compound Calculations

- Automatic compound interest calculations
- Daily, monthly, and yearly yield projections
- Configurable compounding frequency
- Optimal strategy recommendations

### ⚠️ Risk Assessment

- Protocol risk scoring (security audits, TVL, track record)
- Smart contract risk analysis
- Impermanent loss calculations for LP positions
- Risk-adjusted yield comparisons

### 📈 Data Visualization

- Interactive charts for yield trends
- Portfolio performance analytics
- Protocol comparison charts
- Risk vs reward scatter plots

## 🚀 Technology Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Zustand for client state
- **Data Fetching**: TanStack Query for server state
- **Charts**: Recharts for data visualization
- **Web3**: Wagmi for blockchain interactions
- **Build Tool**: Vite for fast development and building

## 📋 Supported Protocols

- **Aave**: Lending and borrowing with dynamic interest rates
- **Compound**: Algorithmic money markets
- **Uniswap V3**: Concentrated liquidity provision
- **Curve Finance**: Stableswap AMM for stablecoins
- **Lido**: Liquid staking for Ethereum 2.0
- More protocols coming soon...

## 🎯 Key Metrics Tracked

- **APY/APR**: Annual percentage yield and rate
- **TVL**: Total Value Locked in protocols
- **Risk Score**: 0-10 risk assessment scale
- **Liquidity**: Available liquidity for deposits/withdrawals
- **Fees**: All applicable fees (deposit, withdrawal, performance)
- **Lock-up Periods**: Time restrictions on withdrawals

## 🛡️ Risk Categories

- **Low Risk** (8-10): Established protocols with multiple audits
- **Medium Risk** (5-7): Newer protocols or higher complexity
- **High Risk** (3-4): Experimental or unaudited protocols
- **Extreme Risk** (0-2): Highly speculative investments

## 🔧 Development

### Getting Started

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Start development server:**

   ```bash
   pnpm dev:defi
   ```

3. **Build for production:**

   ```bash
   pnpm build:defi
   ```

4. **Run type checking:**
   ```bash
   pnpm --filter defi-yield-aggregator typecheck
   ```

### Project Structure

```
src/
├── components/          # React components
│   ├── PoolCard.tsx    # Individual pool display
│   ├── PoolsTable.tsx  # Tabular pool listing
│   ├── PoolFilters.tsx # Search and filter UI
│   ├── PortfolioOverview.tsx # Portfolio dashboard
│   ├── PositionCard.tsx # Individual position display
│   └── YieldChart.tsx  # Data visualization
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
│   ├── chains.ts       # Blockchain configuration
│   ├── utils.ts        # Helper functions
│   └── mock-data.ts    # Development data
├── pages/              # Page components
│   └── Dashboard.tsx   # Main dashboard
├── stores/             # Zustand state stores
│   ├── poolsStore.ts   # Pools and protocols state
│   └── portfolioStore.ts # Portfolio and positions state
├── types/              # TypeScript type definitions
└── App.tsx             # Main application component
```

## 🌐 Deployment

The app is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment includes:

- Automatic building of the UI package dependencies
- Production optimization and bundling
- GitHub Pages deployment with proper routing
- Deployment status notifications

## 🔮 Future Enhancements

- **Multi-chain Support**: Expand beyond Ethereum to Polygon, Arbitrum, etc.
- **Advanced Analytics**: More sophisticated risk models and yield predictions
- **Automated Strategies**: Smart contract integration for automated yield farming
- **Social Features**: Community-driven pool ratings and discussions
- **Mobile App**: React Native version for mobile users
- **Notifications**: Real-time alerts for yield changes and opportunities
