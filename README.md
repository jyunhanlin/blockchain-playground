# Blockchain Playground

A modern monorepo for blockchain applications built with cutting-edge Web3 technologies, React 19, and TypeScript.

## Overview

This monorepo contains multiple blockchain applications and shared packages, designed for scalable Web3 development with modern tooling and best practices.

## Projects

### [`apps/crypto-wallet`](./apps/crypto-wallet)

A comprehensive multi-chain crypto wallet with MetaMask integration. Features real-time balance tracking, multi-chain support, and seamless transaction capabilities.

[View detailed documentation →](./apps/crypto-wallet/README.md)

### Installation

```bash
# Install dependencies for all projects
pnpm install
```

### Development Commands

```bash
# Run crypto wallet app
pnpm --filter crypto-wallet dev

# Build all projects
pnpm build

# Build specific project
pnpm --filter crypto-wallet build

# Lint all projects
pnpm lint

# Format all code
pnpm format

# Install dependencies for specific project
pnpm --filter crypto-wallet add <package-name>
```

## Project Structure

```
blockchain-playground/
├── apps/
│   └── crypto-wallet/          # Multi-chain crypto wallet
│       ├── src/
│       │   ├── components/     # React components
│       │   ├── hooks/          # Custom hooks
│       │   ├── lib/            # Utilities and configurations
│       │   ├── stores/         # State management
│       │   └── types/          # TypeScript definitions
│       ├── package.json
│       └── vite.config.ts
├── packages/                   # Shared packages (future)
├── .github/workflows/          # CI/CD workflows
├── biome.json                  # Biome configuration
├── pnpm-workspace.yaml         # pnpm workspace config
└── package.json                # Root package.json
```

## Monorepo Features

- **🎯 Workspace Management**: pnpm workspaces for efficient dependency management
- **🔧 Shared Tooling**: Unified linting, formatting, and build configurations
- **🚀 CI/CD Pipeline**: Automated workflows with change detection and selective builds
- **📦 Future-Ready**: Structured for shared packages and multiple applications
- **⚡ Fast Development**: Optimized for quick iteration and development workflows

## Architecture

This monorepo is designed with scalability in mind:

- **Apps**: Individual applications with their own deployments
- **Packages**: Shared libraries and utilities (coming soon)
- **Tooling**: Centralized configuration for consistent development experience
- **CI/CD**: Smart workflows that only build what's changed

## Deployment

The project includes automated GitHub Actions workflows that:

1. **Change Detection**: Monitors specific app directories for changes
2. **Selective Building**: Only builds and deploys affected applications
3. **Automated Deployment**: Deploys to GitHub Pages with preview links
4. **PR Integration**: Adds deployment preview links to pull requests

### Manual Deployment

```bash
# Build all projects
pnpm build

# Build specific project
pnpm --filter <project-name> build
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Development Notes

### Monorepo Best Practices

- **Dependency Management**: Use `pnpm --filter <workspace>` for workspace-specific operations
- **Shared Dependencies**: Common dependencies are hoisted to the root when possible
- **Code Quality**: Biome is used instead of ESLint for faster linting and formatting
- **Development Speed**: Each app can be developed independently with hot reloading
- **Consistent Tooling**: Shared configurations ensure consistency across all projects

### Adding New Projects

```bash
# Create new app
mkdir apps/new-app
cd apps/new-app
pnpm init

# Add to workspace (automatically detected due to pnpm-workspace.yaml)
# Install dependencies
pnpm --filter new-app add <dependencies>
```

### Workspace Commands

```bash
# Run command in all workspaces
pnpm -r <command>

# Run command in specific workspace
pnpm --filter <workspace-name> <command>

# Add dependency to specific workspace
pnpm --filter <workspace-name> add <package>

# Remove dependency from specific workspace
pnpm --filter <workspace-name> remove <package>
```
