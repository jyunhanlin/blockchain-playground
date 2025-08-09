import { http, createConfig } from 'wagmi';
import { mainnet, arbitrum, polygon, optimism, base } from 'wagmi/chains';

export const config = createConfig({
  chains: [mainnet, arbitrum, polygon, optimism, base],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
  },
});

export const supportedChains = [mainnet, arbitrum, polygon, optimism, base];

export const chainIcons: Record<number, string> = {
  [mainnet.id]: '🔗',
  [arbitrum.id]: '🟦',
  [polygon.id]: '🟣',
  [optimism.id]: '🔴',
  [base.id]: '🔵',
};

export const chainColors: Record<number, string> = {
  [mainnet.id]: '#627EEA',
  [arbitrum.id]: '#28A0F0',
  [polygon.id]: '#8247E5',
  [optimism.id]: '#FF0420',
  [base.id]: '#0052FF',
};
