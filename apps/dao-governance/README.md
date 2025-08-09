# DAO Governance Platform

A comprehensive decentralized governance platform built with React 19, featuring proposal creation, voting mechanisms, governance token management, and community discussions.

## Features

### 🗳️ Proposal System

- **Create Proposals**: Submit detailed proposals with markdown support
- **Voting Mechanisms**: Vote For, Against, or Abstain on active proposals
- **Proposal Types**: Constitutional, Treasury, Technical, Social, and Emergency proposals
- **Action Specification**: Define on-chain actions to execute if proposals pass
- **Real-time Results**: Live voting progress with quorum and threshold tracking

### 💰 Governance Token Management

- **Token Balance Display**: View your governance token holdings
- **Voting Power Calculation**: See your effective voting power including delegations
- **Delegation System**: Delegate voting power to trusted community members
- **Historical Tracking**: Monitor changes in voting power over time

### 📊 Voting History & Statistics

- **Personal Voting History**: Track all your past votes with reasoning
- **Participation Metrics**: Monitor your governance participation rate
- **Vote Analysis**: View voting patterns and decision rationale
- **Transaction Links**: Direct links to on-chain voting transactions

### 💬 Community Discussions

- **Discussion Threads**: Create and participate in governance discussions
- **Proposal-Linked Discussions**: Connect discussions to specific proposals
- **Reply System**: Threaded replies with nested conversations
- **Voting on Content**: Upvote/downvote discussions and replies
- **Tag System**: Organize discussions with relevant tags

### 🎯 User Experience

- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark/Light Theme**: Automatic theme adaptation
- **Real-time Updates**: Live data synchronization
- **Wallet Integration**: Support for multiple wallet connectors
- **Multi-chain Support**: Ethereum, Arbitrum, Polygon, Optimism

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS with custom component system
- **State Management**: Zustand for global state
- **Web3 Integration**: Wagmi v2 for wallet connections
- **Routing**: React Router v7
- **UI Components**: Custom shadcn/ui-based component library
- **Markdown**: React Markdown with GitHub Flavored Markdown
- **Build Tool**: Vite 6
- **Linting**: Biome for code formatting and linting

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- A Web3 wallet (MetaMask, Coinbase Wallet, etc.)

### Installation

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Start development server**:

   ```bash
   pnpm dev:dao
   ```

3. **Build for production**:
   ```bash
   pnpm build:dao
   ```

### Environment Variables

Create a `.env` file in the app root:

```env
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── governance/      # Governance-specific components
│   ├── proposals/       # Proposal-related components
│   ├── voting/          # Voting UI components
│   └── discussion/      # Discussion components
├── pages/              # Main application pages
├── stores/             # Zustand state management
├── lib/                # Utilities and configurations
├── types/              # TypeScript type definitions
└── hooks/              # Custom React hooks
```

## Key Components

### Governance Components

- **GovernanceTokenDisplay**: Shows token balance and voting power
- **Navbar**: Main navigation with wallet connection
- **Sidebar**: Quick navigation and stats
- **WalletConnect**: Multi-wallet connection modal

### Proposal Components

- **ProposalCard**: Proposal preview with voting progress
- **ProposalFilters**: Advanced filtering and search
- **VoteButton**: Voting interface with confirmation
- **VotingStats**: Real-time voting results and analytics

### Discussion Components

- **DiscussionCard**: Discussion preview with metadata
- **Reply System**: Threaded conversation interface
- **Voting**: Content voting (upvote/downvote)

## State Management

The app uses Zustand for state management with two main stores:

### GovernanceStore

- Proposal management (CRUD operations)
- Voting functionality
- Token balance and voting power
- Delegation management

### DiscussionStore

- Discussion thread management
- Reply system
- Content voting
- Search and filtering

## Styling Architecture

Built with Tailwind CSS using a design system approach:

- **CSS Variables**: Theme-aware color system
- **Component Classes**: Reusable utility classes
- **Responsive Design**: Mobile-first approach
- **Animation**: Smooth transitions and micro-interactions

## Mock Data

For development and demonstration, the app includes comprehensive mock data:

- Sample proposals with different statuses and types
- Voting history with realistic participation patterns
- Discussion threads with nested replies
- User profiles with reputation systems
- DAO metrics and treasury information

## Deployment

The app is configured for GitHub Pages deployment with automatic CI/CD:

1. **Automatic Deployment**: Triggers on commits to `apps/dao-governance/`
2. **Build Optimization**: Production builds with asset optimization
3. **GitHub Actions**: Automated testing and deployment pipeline

### Manual Deployment

```bash
# Build the application
pnpm build:dao

# The built files will be in apps/dao-governance/dist/
```

## Contributing

1. Follow the existing code style (enforced by Biome)
2. Write TypeScript with strict type checking
3. Add tests for new functionality
4. Update documentation for new features
5. Use conventional commit messages

## License

This project is part of the blockchain-playground monorepo and follows the same licensing terms.

## Support

For issues and questions:

1. Check the existing GitHub issues
2. Create a new issue with detailed information
3. Follow the issue template for bug reports or feature requests

---

**Built with ❤️ for the decentralized governance community**
