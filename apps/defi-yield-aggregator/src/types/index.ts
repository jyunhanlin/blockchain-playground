import type { Address } from 'viem';

export interface DeFiProtocol {
  id: string;
  name: string;
  category: ProtocolCategory;
  icon: string;
  description: string;
  website: string;
  tvl: number;
  riskScore: number;
  auditStatus: AuditStatus;
  isActive: boolean;
}

export interface YieldPool {
  id: string;
  protocol: DeFiProtocol;
  name: string;
  symbol: string;
  apy: number;
  apr: number;
  tvl: number;
  tokenAddress: Address;
  depositToken: Token;
  rewardTokens: Token[];
  minimumDeposit: number;
  lockupPeriod: number;
  riskLevel: RiskLevel;
  strategy: PoolStrategy;
  fees: PoolFees;
  lastUpdated: Date;
}

export interface Token {
  address: Address;
  symbol: string;
  name: string;
  decimals: number;
  icon: string;
  price: number;
  priceChange24h: number;
}

export interface PoolFees {
  deposit: number;
  withdrawal: number;
  performance: number;
  management: number;
}

export interface UserPosition {
  id: string;
  poolId: string;
  pool: YieldPool;
  amount: number;
  value: number;
  pendingRewards: TokenAmount[];
  depositedAt: Date;
  lastClaimedAt: Date | null;
  autoCompound: boolean;
  estimatedApy: number;
}

export interface TokenAmount {
  token: Token;
  amount: number;
  value: number;
}

export interface Portfolio {
  totalValue: number;
  totalDeposited: number;
  totalRewards: number;
  totalFees: number;
  pnl: number;
  pnlPercentage: number;
  positions: UserPosition[];
  dailyRewards: number;
  monthlyRewards: number;
  yearlyProjection: number;
}

export interface YieldStrategy {
  id: string;
  name: string;
  description: string;
  pools: YieldPool[];
  allocation: Record<string, number>;
  expectedApy: number;
  riskScore: number;
  minimumInvestment: number;
}

export interface RiskMetrics {
  impermanentLoss: number;
  smartContractRisk: number;
  liquidityRisk: number;
  marketRisk: number;
  protocolRisk: number;
  overallScore: number;
}

export interface HistoricalData {
  timestamp: Date;
  apy: number;
  tvl: number;
  price: number;
  volume: number;
}

export interface YieldFarmingStats {
  totalPools: number;
  totalTvl: number;
  averageApy: number;
  topPerformers: YieldPool[];
  riskDistribution: Record<RiskLevel, number>;
  protocolDistribution: Record<string, number>;
}

export enum ProtocolCategory {
  LENDING = 'lending',
  DEX = 'dex',
  YIELD_FARMING = 'yield_farming',
  LIQUID_STAKING = 'liquid_staking',
  DERIVATIVES = 'derivatives',
  INSURANCE = 'insurance',
  BRIDGE = 'bridge',
  OTHER = 'other',
}

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  EXTREME = 'extreme',
}

export enum AuditStatus {
  AUDITED = 'audited',
  PARTIALLY_AUDITED = 'partially_audited',
  UNAUDITED = 'unaudited',
  PENDING = 'pending',
}

export enum PoolStrategy {
  SINGLE_ASSET = 'single_asset',
  LP_FARMING = 'lp_farming',
  LENDING = 'lending',
  STAKING = 'staking',
  VAULT = 'vault',
  ARBITRAGE = 'arbitrage',
}

export interface FilterOptions {
  protocols: string[];
  categories: ProtocolCategory[];
  riskLevels: RiskLevel[];
  minApy: number;
  maxApy: number;
  minTvl: number;
  sortBy: SortOption;
  sortOrder: 'asc' | 'desc';
}

export enum SortOption {
  APY = 'apy',
  TVL = 'tvl',
  RISK = 'risk',
  NAME = 'name',
  CATEGORY = 'category',
}

export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
