import { coinbaseWallet, metaMask, walletConnect } from '@wagmi/connectors';
import { createConfig, http } from 'wagmi';
import { polygon, sepolia } from './chains';

const projectId = 'your-wallet-connect-project-id';

export const config = createConfig({
  chains: [sepolia, polygon],
  connectors: [
    metaMask(),
    walletConnect({ projectId }),
    coinbaseWallet({
      appName: 'NFT Marketplace',
    }),
  ],
  transports: {
    [sepolia.id]: http(),
    [polygon.id]: http(),
  },
});
