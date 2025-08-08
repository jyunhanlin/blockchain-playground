import { defineChain } from 'viem';
import { arbitrum, mainnet, optimism, polygon, sepolia } from 'viem/chains';

export const supportedChains = [mainnet, sepolia, polygon, arbitrum, optimism] as const;

export type SupportedChain = (typeof supportedChains)[number];

// Mock tokens for testing (in production, fetch from token lists)
export const MOCK_TOKENS = {
  [mainnet.id]: [
    {
      address: '0xA0b86a33E6441b539E85e29e2C4D2DC9a2b8c4EC' as const,
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: 18,
      logoURI: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    },
    {
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7' as const,
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      logoURI: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    },
    {
      address: '0xA0b86a33E6441b539E85e29e2C4D2DC9a2b8c4EC' as const,
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      logoURI: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
    },
  ],
  [sepolia.id]: [
    {
      address: '0x0000000000000000000000000000000000000000' as const,
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: 18,
      logoURI: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    },
    {
      address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984' as const,
      symbol: 'USDT',
      name: 'Test USDT',
      decimals: 6,
      logoURI: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    },
  ],
  [polygon.id]: [
    {
      address: '0x0000000000000000000000000000000000000000' as const,
      symbol: 'MATIC',
      name: 'Polygon',
      decimals: 18,
      logoURI: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    },
    {
      address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F' as const,
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      logoURI: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    },
  ],
  [arbitrum.id]: [
    {
      address: '0x0000000000000000000000000000000000000000' as const,
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: 18,
      logoURI: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    },
    {
      address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9' as const,
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      logoURI: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    },
  ],
  [optimism.id]: [
    {
      address: '0x0000000000000000000000000000000000000000' as const,
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: 18,
      logoURI: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    },
    {
      address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58' as const,
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      logoURI: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    },
  ],
} as const;

export type Token = {
  address: `0x${string}`;
  symbol: string;
  name: string;
  decimals: number;
  logoURI: string;
};

export function getTokensForChain(chainId: number): Token[] {
  return MOCK_TOKENS[chainId as keyof typeof MOCK_TOKENS] || [];
}

export function getChainName(chainId: number): string {
  const chain = supportedChains.find((c) => c.id === chainId);
  return chain?.name || 'Unknown Chain';
}
