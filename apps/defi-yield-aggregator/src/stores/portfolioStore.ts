import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockPortfolio, mockUserPositions } from '@/lib/mock-data';
import type { Portfolio, UserPosition, YieldPool } from '@/types';

interface PortfolioState {
  portfolio: Portfolio | null;
  positions: UserPosition[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchPortfolio: () => Promise<void>;
  addPosition: (poolId: string, amount: number) => Promise<void>;
  removePosition: (positionId: string) => Promise<void>;
  updatePosition: (positionId: string, updates: Partial<UserPosition>) => void;
  claimRewards: (positionId: string) => Promise<void>;
  toggleAutoCompound: (positionId: string) => void;
  calculateProjections: (timeframe: 'daily' | 'monthly' | 'yearly') => number;
  refreshData: () => Promise<void>;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      portfolio: null,
      positions: [],
      isLoading: false,
      error: null,

      fetchPortfolio: async () => {
        set({ isLoading: true, error: null });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // In a real app, this would be an API call
          set({
            portfolio: mockPortfolio,
            positions: mockUserPositions,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch portfolio',
            isLoading: false,
          });
        }
      },

      addPosition: async (poolId: string, amount: number) => {
        set({ isLoading: true, error: null });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1500));

          // Create new position (in real app, this would come from API)
          const newPosition: UserPosition = {
            id: `pos-${Date.now()}`,
            poolId,
            pool: {} as YieldPool, // Would be populated from API
            amount,
            value: amount,
            pendingRewards: [],
            depositedAt: new Date(),
            lastClaimedAt: null,
            autoCompound: false,
            estimatedApy: 0,
          };

          const { positions, portfolio } = get();
          const updatedPositions = [...positions, newPosition];

          // Recalculate portfolio
          const totalValue = updatedPositions.reduce((sum, pos) => sum + pos.value, 0);
          const updatedPortfolio = portfolio
            ? {
                ...portfolio,
                totalValue,
                positions: updatedPositions,
              }
            : null;

          set({
            positions: updatedPositions,
            portfolio: updatedPortfolio,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to add position',
            isLoading: false,
          });
        }
      },

      removePosition: async (positionId: string) => {
        set({ isLoading: true, error: null });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const { positions, portfolio } = get();
          const updatedPositions = positions.filter((pos) => pos.id !== positionId);

          // Recalculate portfolio
          const totalValue = updatedPositions.reduce((sum, pos) => sum + pos.value, 0);
          const updatedPortfolio = portfolio
            ? {
                ...portfolio,
                totalValue,
                positions: updatedPositions,
              }
            : null;

          set({
            positions: updatedPositions,
            portfolio: updatedPortfolio,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to remove position',
            isLoading: false,
          });
        }
      },

      updatePosition: (positionId: string, updates: Partial<UserPosition>) => {
        const { positions, portfolio } = get();
        const updatedPositions = positions.map((pos) =>
          pos.id === positionId ? { ...pos, ...updates } : pos
        );

        // Recalculate portfolio if needed
        const totalValue = updatedPositions.reduce((sum, pos) => sum + pos.value, 0);
        const updatedPortfolio = portfolio
          ? {
              ...portfolio,
              totalValue,
              positions: updatedPositions,
            }
          : null;

        set({
          positions: updatedPositions,
          portfolio: updatedPortfolio,
        });
      },

      claimRewards: async (positionId: string) => {
        set({ isLoading: true, error: null });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1500));

          const { updatePosition } = get();
          updatePosition(positionId, {
            pendingRewards: [],
            lastClaimedAt: new Date(),
          });

          set({ isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to claim rewards',
            isLoading: false,
          });
        }
      },

      toggleAutoCompound: (positionId: string) => {
        const { positions, updatePosition } = get();
        const position = positions.find((pos) => pos.id === positionId);
        if (position) {
          updatePosition(positionId, { autoCompound: !position.autoCompound });
        }
      },

      calculateProjections: (timeframe: 'daily' | 'monthly' | 'yearly') => {
        const { portfolio } = get();
        if (!portfolio) return 0;

        switch (timeframe) {
          case 'daily':
            return portfolio.dailyRewards;
          case 'monthly':
            return portfolio.monthlyRewards;
          case 'yearly':
            return portfolio.yearlyProjection;
          default:
            return 0;
        }
      },

      refreshData: async () => {
        const { fetchPortfolio } = get();
        await fetchPortfolio();
      },
    }),
    {
      name: 'portfolio-storage',
      partialize: (state) => ({
        positions: state.positions,
        portfolio: state.portfolio,
      }),
    }
  )
);
