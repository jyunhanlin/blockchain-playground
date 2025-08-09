import type {
  DeFiProtocol,
  YieldPool,
  Token,
  UserPosition,
  Portfolio,
  HistoricalData,
} from '@/types';
import { ProtocolCategory, RiskLevel, AuditStatus, PoolStrategy } from '@/types';

// Mock tokens
export const mockTokens: Token[] = [
  {
    address: '0xA0b86a33E6441786C606D9F6Daa009f94eaF632',
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    icon: '💰',
    price: 1.0,
    priceChange24h: 0.01,
  },
  {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    icon: '💵',
    price: 1.0,
    priceChange24h: -0.02,
  },
  {
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    decimals: 18,
    icon: '🟡',
    price: 1.0,
    priceChange24h: 0.03,
  },
  {
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    symbol: 'WETH',
    name: 'Wrapped Ether',
    decimals: 18,
    icon: '⚡',
    price: 2350.45,
    priceChange24h: 3.25,
  },
  {
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    decimals: 8,
    icon: '₿',
    price: 43250.75,
    priceChange24h: 2.15,
  },
];

// Mock protocols
export const mockProtocols: DeFiProtocol[] = [
  {
    id: 'aave',
    name: 'Aave',
    category: ProtocolCategory.LENDING,
    icon: '👻',
    description: 'Decentralized lending and borrowing protocol',
    website: 'https://aave.com',
    tvl: 11500000000,
    riskScore: 8.5,
    auditStatus: AuditStatus.AUDITED,
    isActive: true,
  },
  {
    id: 'compound',
    name: 'Compound',
    category: ProtocolCategory.LENDING,
    icon: '🏦',
    description: 'Algorithmic money markets protocol',
    website: 'https://compound.finance',
    tvl: 3200000000,
    riskScore: 8.2,
    auditStatus: AuditStatus.AUDITED,
    isActive: true,
  },
  {
    id: 'uniswap',
    name: 'Uniswap V3',
    category: ProtocolCategory.DEX,
    icon: '🦄',
    description: 'Concentrated liquidity DEX',
    website: 'https://uniswap.org',
    tvl: 5800000000,
    riskScore: 7.8,
    auditStatus: AuditStatus.AUDITED,
    isActive: true,
  },
  {
    id: 'curve',
    name: 'Curve Finance',
    category: ProtocolCategory.DEX,
    icon: '🌀',
    description: 'Stableswap AMM for stablecoins',
    website: 'https://curve.fi',
    tvl: 4100000000,
    riskScore: 8.0,
    auditStatus: AuditStatus.AUDITED,
    isActive: true,
  },
  {
    id: 'lido',
    name: 'Lido',
    category: ProtocolCategory.LIQUID_STAKING,
    icon: '🌊',
    description: 'Liquid staking for Ethereum 2.0',
    website: 'https://lido.fi',
    tvl: 32000000000,
    riskScore: 8.7,
    auditStatus: AuditStatus.AUDITED,
    isActive: true,
  },
];

// Mock yield pools
export const mockYieldPools: YieldPool[] = [
  {
    id: 'aave-usdc',
    protocol: mockProtocols[0],
    name: 'USDC Lending',
    symbol: 'aUSDC',
    apy: 4.25,
    apr: 4.15,
    tvl: 2500000000,
    tokenAddress: '0xBcca60bB61934080951369a648Fb03DF4F96263C',
    depositToken: mockTokens[0],
    rewardTokens: [mockTokens[0]],
    minimumDeposit: 1,
    lockupPeriod: 0,
    riskLevel: RiskLevel.LOW,
    strategy: PoolStrategy.LENDING,
    fees: {
      deposit: 0,
      withdrawal: 0,
      performance: 0,
      management: 0,
    },
    lastUpdated: new Date(),
  },
  {
    id: 'aave-usdt',
    protocol: mockProtocols[0],
    name: 'USDT Lending',
    symbol: 'aUSDT',
    apy: 4.18,
    apr: 4.08,
    tvl: 1800000000,
    tokenAddress: '0x3Ed3B47Dd13EC9a98b44e6204A523E766B225811',
    depositToken: mockTokens[1],
    rewardTokens: [mockTokens[1]],
    minimumDeposit: 1,
    lockupPeriod: 0,
    riskLevel: RiskLevel.LOW,
    strategy: PoolStrategy.LENDING,
    fees: {
      deposit: 0,
      withdrawal: 0,
      performance: 0,
      management: 0,
    },
    lastUpdated: new Date(),
  },
  {
    id: 'uniswap-usdc-weth',
    protocol: mockProtocols[2],
    name: 'USDC/WETH LP',
    symbol: 'UNI-V3-USDC-WETH',
    apy: 12.75,
    apr: 12.35,
    tvl: 450000000,
    tokenAddress: '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640',
    depositToken: mockTokens[0],
    rewardTokens: [mockTokens[0], mockTokens[3]],
    minimumDeposit: 100,
    lockupPeriod: 0,
    riskLevel: RiskLevel.MEDIUM,
    strategy: PoolStrategy.LP_FARMING,
    fees: {
      deposit: 0,
      withdrawal: 0.3,
      performance: 0,
      management: 0,
    },
    lastUpdated: new Date(),
  },
  {
    id: 'curve-3pool',
    protocol: mockProtocols[3],
    name: '3Pool (DAI/USDC/USDT)',
    symbol: '3Crv',
    apy: 8.45,
    apr: 8.15,
    tvl: 1200000000,
    tokenAddress: '0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490',
    depositToken: mockTokens[2],
    rewardTokens: [mockTokens[0], mockTokens[1], mockTokens[2]],
    minimumDeposit: 10,
    lockupPeriod: 0,
    riskLevel: RiskLevel.LOW,
    strategy: PoolStrategy.LP_FARMING,
    fees: {
      deposit: 0,
      withdrawal: 0.04,
      performance: 0,
      management: 0,
    },
    lastUpdated: new Date(),
  },
  {
    id: 'lido-steth',
    protocol: mockProtocols[4],
    name: 'Ethereum Staking',
    symbol: 'stETH',
    apy: 5.2,
    apr: 5.0,
    tvl: 24000000000,
    tokenAddress: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
    depositToken: mockTokens[3],
    rewardTokens: [mockTokens[3]],
    minimumDeposit: 0.01,
    lockupPeriod: 0,
    riskLevel: RiskLevel.LOW,
    strategy: PoolStrategy.STAKING,
    fees: {
      deposit: 0,
      withdrawal: 0,
      performance: 10,
      management: 0,
    },
    lastUpdated: new Date(),
  },
  {
    id: 'compound-usdc',
    protocol: mockProtocols[1],
    name: 'USDC Supply',
    symbol: 'cUSDC',
    apy: 3.95,
    apr: 3.85,
    tvl: 850000000,
    tokenAddress: '0x39AA39c021dfbaE8faC545936693aC917d5E7563',
    depositToken: mockTokens[0],
    rewardTokens: [mockTokens[0]],
    minimumDeposit: 1,
    lockupPeriod: 0,
    riskLevel: RiskLevel.LOW,
    strategy: PoolStrategy.LENDING,
    fees: {
      deposit: 0,
      withdrawal: 0,
      performance: 0,
      management: 0,
    },
    lastUpdated: new Date(),
  },
  {
    id: 'uniswap-wbtc-weth',
    protocol: mockProtocols[2],
    name: 'WBTC/WETH LP',
    symbol: 'UNI-V3-WBTC-WETH',
    apy: 15.25,
    apr: 14.75,
    tvl: 320000000,
    tokenAddress: '0xCBCdF9626bC03E24f779434178A73a0B4bad62eD',
    depositToken: mockTokens[4],
    rewardTokens: [mockTokens[3], mockTokens[4]],
    minimumDeposit: 0.001,
    lockupPeriod: 0,
    riskLevel: RiskLevel.HIGH,
    strategy: PoolStrategy.LP_FARMING,
    fees: {
      deposit: 0,
      withdrawal: 0.3,
      performance: 0,
      management: 0,
    },
    lastUpdated: new Date(),
  },
];

// Mock user positions
export const mockUserPositions: UserPosition[] = [
  {
    id: 'pos-1',
    poolId: 'aave-usdc',
    pool: mockYieldPools[0],
    amount: 5000,
    value: 5000,
    pendingRewards: [{ token: mockTokens[0], amount: 25.5, value: 25.5 }],
    depositedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    lastClaimedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    autoCompound: true,
    estimatedApy: 4.25,
  },
  {
    id: 'pos-2',
    poolId: 'uniswap-usdc-weth',
    pool: mockYieldPools[2],
    amount: 2000,
    value: 2150,
    pendingRewards: [
      { token: mockTokens[0], amount: 45.2, value: 45.2 },
      { token: mockTokens[3], amount: 0.012, value: 28.2 },
    ],
    depositedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    lastClaimedAt: null,
    autoCompound: false,
    estimatedApy: 12.75,
  },
  {
    id: 'pos-3',
    poolId: 'lido-steth',
    pool: mockYieldPools[4],
    amount: 1,
    value: 2350.45,
    pendingRewards: [{ token: mockTokens[3], amount: 0.008, value: 18.8 }],
    depositedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    lastClaimedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    autoCompound: true,
    estimatedApy: 5.2,
  },
];

// Mock portfolio
export const mockPortfolio: Portfolio = {
  totalValue: 9500.45,
  totalDeposited: 8000,
  totalRewards: 1500.45,
  totalFees: 8.75,
  pnl: 1491.7,
  pnlPercentage: 18.65,
  positions: mockUserPositions,
  dailyRewards: 4.25,
  monthlyRewards: 127.5,
  yearlyProjection: 1530,
};

// Mock historical data
export const mockHistoricalData: HistoricalData[] = Array.from({ length: 30 }, (_, i) => ({
  timestamp: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
  apy: 4.25 + Math.sin(i / 5) * 0.5 + Math.random() * 0.2,
  tvl: 2500000000 + Math.sin(i / 3) * 100000000 + Math.random() * 50000000,
  price: 1.0 + Math.sin(i / 7) * 0.002 + Math.random() * 0.001,
  volume: 50000000 + Math.sin(i / 4) * 10000000 + Math.random() * 5000000,
}));

// Risk score calculation based on various factors
export function calculateRiskScore(pool: YieldPool): number {
  let score = 10; // Start with maximum score

  // Protocol risk
  score -= (10 - pool.protocol.riskScore) * 0.3;

  // Strategy risk
  switch (pool.strategy) {
    case PoolStrategy.LENDING:
      score -= 1;
      break;
    case PoolStrategy.STAKING:
      score -= 1.5;
      break;
    case PoolStrategy.LP_FARMING:
      score -= 2.5;
      break;
    case PoolStrategy.VAULT:
      score -= 2;
      break;
    case PoolStrategy.ARBITRAGE:
      score -= 3;
      break;
  }

  // APY risk (higher APY usually means higher risk)
  if (pool.apy > 20) score -= 2;
  else if (pool.apy > 10) score -= 1;
  else if (pool.apy > 5) score -= 0.5;

  // Audit status
  switch (pool.protocol.auditStatus) {
    case AuditStatus.UNAUDITED:
      score -= 2;
      break;
    case AuditStatus.PARTIALLY_AUDITED:
      score -= 1;
      break;
    case AuditStatus.PENDING:
      score -= 1.5;
      break;
  }

  // TVL risk (lower TVL means higher risk)
  if (pool.tvl < 10000000) score -= 2;
  else if (pool.tvl < 100000000) score -= 1;
  else if (pool.tvl < 1000000000) score -= 0.5;

  return Math.max(0, Math.min(10, score));
}
