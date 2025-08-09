import { createConfig, http } from 'wagmi';
import { arbitrum, mainnet, optimism, polygon, sepolia } from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';

const projectId = 'demo-project-id';

export const config = createConfig({
  chains: [mainnet, sepolia, arbitrum, polygon, optimism],
  connectors: [
    injected(),
    coinbaseWallet({
      appName: 'DAO Governance Platform',
      appLogoUrl: 'https://avatars.githubusercontent.com/u/109633172',
    }),
    walletConnect({
      projectId,
      metadata: {
        name: 'DAO Governance Platform',
        description: 'Decentralized governance made simple',
        url: 'https://dao-governance.example.com',
        icons: ['https://avatars.githubusercontent.com/u/109633172'],
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [arbitrum.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
  },
});
