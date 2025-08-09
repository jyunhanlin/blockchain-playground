import { create } from 'zustand';
import { mockProtocols, mockYieldPools } from '@/lib/mock-data';
import { sortBy } from '@/lib/utils';
import type { DeFiProtocol, FilterOptions, RiskLevel, YieldFarmingStats, YieldPool } from '@/types';
import { SortOption } from '@/types';

interface PoolsState {
  pools: YieldPool[];
  protocols: DeFiProtocol[];
  filteredPools: YieldPool[];
  stats: YieldFarmingStats | null;
  filters: FilterOptions;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;

  // Actions
  fetchPools: () => Promise<void>;
  fetchProtocols: () => Promise<void>;
  fetchStats: () => Promise<void>;
  setFilters: (filters: Partial<FilterOptions>) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
  applyFilters: () => void;
  getPoolById: (id: string) => YieldPool | undefined;
  getProtocolById: (id: string) => DeFiProtocol | undefined;
  refreshData: () => Promise<void>;
}

const defaultFilters: FilterOptions = {
  protocols: [],
  categories: [],
  riskLevels: [],
  minApy: 0,
  maxApy: 100,
  minTvl: 0,
  sortBy: SortOption.APY,
  sortOrder: 'desc',
};

export const usePoolsStore = create<PoolsState>((set, get) => ({
  pools: [],
  protocols: [],
  filteredPools: [],
  stats: null,
  filters: defaultFilters,
  isLoading: false,
  error: null,
  searchQuery: '',

  fetchPools: async () => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would be an API call
      set({ pools: mockYieldPools, isLoading: false });

      // Apply filters after fetching
      get().applyFilters();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch pools',
        isLoading: false,
      });
    }
  },

  fetchProtocols: async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      set({ protocols: mockProtocols });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch protocols',
      });
    }
  },

  fetchStats: async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const { pools } = get();

      // Calculate stats from pools
      const stats: YieldFarmingStats = {
        totalPools: pools.length,
        totalTvl: pools.reduce((sum, pool) => sum + pool.tvl, 0),
        averageApy: pools.reduce((sum, pool) => sum + pool.apy, 0) / pools.length,
        topPerformers: sortBy(pools, 'apy', 'desc').slice(0, 5),
        riskDistribution: pools.reduce(
          (acc, pool) => {
            acc[pool.riskLevel] = (acc[pool.riskLevel] || 0) + 1;
            return acc;
          },
          {} as Record<RiskLevel, number>
        ),
        protocolDistribution: pools.reduce(
          (acc, pool) => {
            acc[pool.protocol.name] = (acc[pool.protocol.name] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        ),
      };

      set({ stats });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch stats',
      });
    }
  },

  setFilters: (newFilters: Partial<FilterOptions>) => {
    const { filters } = get();
    const updatedFilters = { ...filters, ...newFilters };
    set({ filters: updatedFilters });
    get().applyFilters();
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    get().applyFilters();
  },

  resetFilters: () => {
    set({ filters: defaultFilters, searchQuery: '' });
    get().applyFilters();
  },

  applyFilters: () => {
    const { pools, filters, searchQuery } = get();

    let filtered = [...pools];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (pool) =>
          pool.name.toLowerCase().includes(query) ||
          pool.protocol.name.toLowerCase().includes(query) ||
          pool.depositToken.symbol.toLowerCase().includes(query)
      );
    }

    // Apply protocol filter
    if (filters.protocols.length > 0) {
      filtered = filtered.filter((pool) => filters.protocols.includes(pool.protocol.id));
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((pool) => filters.categories.includes(pool.protocol.category));
    }

    // Apply risk level filter
    if (filters.riskLevels.length > 0) {
      filtered = filtered.filter((pool) => filters.riskLevels.includes(pool.riskLevel));
    }

    // Apply APY range filter
    filtered = filtered.filter((pool) => pool.apy >= filters.minApy && pool.apy <= filters.maxApy);

    // Apply TVL filter
    filtered = filtered.filter((pool) => pool.tvl >= filters.minTvl);

    // Apply sorting
    filtered = sortBy(
      filtered,
      (pool) => {
        switch (filters.sortBy) {
          case SortOption.APY:
            return pool.apy;
          case SortOption.TVL:
            return pool.tvl;
          case SortOption.RISK:
            return pool.protocol.riskScore;
          case SortOption.NAME:
            return pool.name;
          case SortOption.CATEGORY:
            return pool.protocol.category;
          default:
            return pool.apy;
        }
      },
      filters.sortOrder
    );

    set({ filteredPools: filtered });
  },

  getPoolById: (id: string) => {
    const { pools } = get();
    return pools.find((pool) => pool.id === id);
  },

  getProtocolById: (id: string) => {
    const { protocols } = get();
    return protocols.find((protocol) => protocol.id === id);
  },

  refreshData: async () => {
    const { fetchPools, fetchProtocols, fetchStats } = get();
    await Promise.all([fetchPools(), fetchProtocols(), fetchStats()]);
  },
}));
