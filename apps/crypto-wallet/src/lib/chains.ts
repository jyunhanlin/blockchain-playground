import { mainnet, polygon, sepolia } from 'wagmi/chains';
import type { Chain } from 'wagmi/chains';

export const supportedChains: Chain[] = [mainnet, polygon, sepolia];

export const chainConfig = {
  [mainnet.id]: {
    name: 'Ethereum',
    currency: 'ETH',
    explorer: 'https://etherscan.io',
    rpcUrl: 'https://ethereum-rpc.publicnode.com',
  },
  [polygon.id]: {
    name: 'Polygon',
    currency: 'MATIC',
    explorer: 'https://polygonscan.com',
    rpcUrl: 'https://polygon-rpc.com',
  },
  [sepolia.id]: {
    name: 'Sepolia Testnet',
    currency: 'ETH',
    explorer: 'https://sepolia.etherscan.io',
    rpcUrl: 'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  },
};

export function getChainConfig(chainId: number) {
  return chainConfig[chainId as keyof typeof chainConfig] || null;
}
