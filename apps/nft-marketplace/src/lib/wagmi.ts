import { http, createConfig } from 'wagmi';
import { sepolia, polygon } from './chains';
import { metaMask, walletConnect, coinbaseWallet } from '@wagmi/connectors';

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
