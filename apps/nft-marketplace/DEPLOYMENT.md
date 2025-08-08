# NFT Marketplace Deployment Guide

## Automatic Deployment with GitHub Actions

This NFT Marketplace is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Enable GitHub Pages**

   - Go to your repository Settings
   - Navigate to "Pages" section
   - Set Source to "GitHub Actions"

2. **Configure Environment Variables**
   Add the following secrets in GitHub repository settings (Settings > Secrets and variables > Actions):

   ```
   VITE_INFURA_PROJECT_ID=your_infura_project_id
   VITE_INFURA_PROJECT_SECRET=your_infura_project_secret
   VITE_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
   ```

3. **Automatic Deployment**
   - The app automatically deploys when changes are pushed to the `main` branch
   - Only deploys when files in `apps/nft-marketplace/` are modified
   - Creates deployment comments on pull requests

### Manual Deployment

To deploy manually:

```bash
cd apps/nft-marketplace
pnpm install
pnpm run build
```

The built files will be in the `dist/` directory.

### Environment Setup

#### IPFS (Infura)

1. Sign up at [Infura](https://infura.io/)
2. Create an IPFS project
3. Get your Project ID and Project Secret

#### WalletConnect

1. Sign up at [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create a new project
3. Get your Project ID

### Features

✅ **Automated Deployment**

- Builds on every push to main
- Deploys to GitHub Pages
- Creates PR deployment comments

✅ **Modern Web3 Stack**

- React 19 + TypeScript
- Wagmi + Viem for Web3
- IPFS for decentralized storage
- Tailwind CSS + shadcn/ui

✅ **NFT Marketplace Features**

- NFT Gallery with filters
- Create and mint NFTs
- User profiles
- Wallet integration
- Responsive design

### Deployment URL

After setup, your NFT Marketplace will be available at:
`https://YOUR_USERNAME.github.io/blockchain-playground/`

### Troubleshooting

**Build Failures:**

- Check that all environment variables are set correctly
- Ensure the GitHub Actions workflow has proper permissions
- Verify the `base` path in `vite.config.ts` matches your repository name

**IPFS Issues:**

- Verify Infura credentials are correct
- Check IPFS project is active
- Ensure proper CORS settings in Infura dashboard

**Wallet Connection Issues:**

- Verify WalletConnect Project ID
- Check that the app is served over HTTPS
- Ensure proper network configuration
