import type { Chain } from 'wagmi/chains';
import { arbitrum, mainnet, optimism, polygon, sepolia } from 'wagmi/chains';

export const supportedChains: Chain[] = [mainnet, sepolia, arbitrum, polygon, optimism];

export const chainIcons: Record<number, string> = {
  [mainnet.id]: '🟠',
  [sepolia.id]: '🔵',
  [arbitrum.id]: '🔷',
  [polygon.id]: '🟣',
  [optimism.id]: '🔴',
};

export const governanceContracts: Record<
  number,
  { governor: string; token: string; timelock?: string }
> = {
  [mainnet.id]: {
    governor: '0x408ED6354d4973f66138C91495F2f2FCbd8724C3',
    token: '0x4F9254C83EB525f9FCf346490bbb3ed28a81C667',
    timelock: '0x0EB5B03c0303f2F47cD81d7BE4275AF8Ed347576',
  },
  [sepolia.id]: {
    governor: '0x2e234DAe75C793f67A35089C9d99245E1C58470b',
    token: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  },
  [arbitrum.id]: {
    governor: '0x789B1C54a4c90a548f5e0F9E7F1a6c18C2f2A7d9',
    token: '0xAbC1234567890ABCdef1234567890ABCdef123456',
  },
  [polygon.id]: {
    governor: '0x123456789abcdef123456789abcdef1234567890',
    token: '0xfedcba9876543210fedcba9876543210fedcba98',
  },
  [optimism.id]: {
    governor: '0x987654321fedcba987654321fedcba9876543210',
    token: '0x1111222233334444555566667777888899990000',
  },
};
