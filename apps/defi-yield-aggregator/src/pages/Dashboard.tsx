import { Button, Card, Tabs } from '@blockchain-playground/ui';
import { LayoutGrid, List } from 'lucide-react';
import React, { useEffect } from 'react';
import { PoolCard } from '@/components/PoolCard';
import { PoolFilters } from '@/components/PoolFilters';
import { PoolsTable } from '@/components/PoolsTable';
import { PortfolioOverview } from '@/components/PortfolioOverview';
import { MultiPoolComparison, YieldChart } from '@/components/YieldChart';
import { mockHistoricalData } from '@/lib/mock-data';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { usePoolsStore } from '@/stores/poolsStore';
import { usePortfolioStore } from '@/stores/portfolioStore';

export function Dashboard() {
  const {
    filteredPools,
    protocols,
    stats,
    filters,
    searchQuery,

    fetchPools,
    fetchProtocols,
    fetchStats,
    setFilters,
    setSearchQuery,
    resetFilters,
  } = usePoolsStore();

  const {
    portfolio,

    isLoading: portfolioLoading,
    fetchPortfolio,
    refreshData: refreshPortfolio,
  } = usePortfolioStore();

  const [viewMode, setViewMode] = React.useState<'grid' | 'table'>('grid');
  const [activeTab, setActiveTab] = React.useState('overview');

  useEffect(() => {
    fetchPools();
    fetchProtocols();
    fetchStats();
    fetchPortfolio();
  }, [fetchPools, fetchProtocols, fetchStats, fetchPortfolio]);

  const handleDeposit = (poolId: string) => {
    // In a real app, this would open a deposit modal
    console.log('Deposit to pool:', poolId);
  };

  const handleViewDetails = (poolId: string) => {
    // In a real app, this would navigate to pool details
    console.log('View pool details:', poolId);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">DeFi Yield Aggregator</h1>
        <p className="text-xl text-muted-foreground">
          Discover and track the best DeFi yields across protocols
        </p>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalPools}</div>
            <div className="text-sm text-muted-foreground">Active Pools</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(stats.totalTvl, 'USD', 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total TVL</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {formatPercentage(stats.averageApy)}
            </div>
            <div className="text-sm text-muted-foreground">Average APY</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">{protocols.length}</div>
            <div className="text-sm text-muted-foreground">Protocols</div>
          </Card>
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex space-x-1 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'overview' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pools')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'pools' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
          >
            Pools
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('portfolio')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'portfolio' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
          >
            Portfolio
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'analytics' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
          >
            Analytics
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Performers */}
            {stats?.topPerformers && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Top Performing Pools</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stats.topPerformers.slice(0, 6).map((pool) => (
                    <PoolCard
                      key={pool.id}
                      pool={pool}
                      onDeposit={handleDeposit}
                      onViewDetails={handleViewDetails}
                      isCompact
                    />
                  ))}
                </div>
              </Card>
            )}

            {/* Market Trends */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Market Trends</h3>
              <YieldChart data={mockHistoricalData} type="apy" height={300} />
            </Card>
          </div>
        )}

        {/* Pools Tab */}
        {activeTab === 'pools' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <PoolFilters
                filters={filters}
                protocols={protocols}
                searchQuery={searchQuery}
                onFiltersChange={setFilters}
                onSearchChange={setSearchQuery}
                onReset={resetFilters}
              />
            </div>

            {/* Pools Content */}
            <div className="lg:col-span-3 space-y-4">
              {/* View Controls */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredPools.length} pools
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Pools Display */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPools.map((pool) => (
                    <PoolCard
                      key={pool.id}
                      pool={pool}
                      onDeposit={handleDeposit}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              ) : (
                <PoolsTable
                  pools={filteredPools}
                  sortBy={filters.sortBy}
                  sortOrder={filters.sortOrder}
                  onSort={(sortBy) => setFilters({ sortBy })}
                  onDeposit={handleDeposit}
                  onViewDetails={handleViewDetails}
                />
              )}
            </div>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && portfolio && (
          <PortfolioOverview
            portfolio={portfolio}
            onRefresh={refreshPortfolio}
            isLoading={portfolioLoading}
          />
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Pool Comparison */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Pool APY Comparison</h3>
              <MultiPoolComparison pools={filteredPools.slice(0, 10)} metric="apy" />
            </Card>

            {/* TVL Comparison */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Pool TVL Comparison</h3>
              <MultiPoolComparison pools={filteredPools.slice(0, 10)} metric="tvl" />
            </Card>

            {/* Risk Analysis */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Risk Score Comparison</h3>
              <MultiPoolComparison pools={filteredPools.slice(0, 10)} metric="riskScore" />
            </Card>
          </div>
        )}
      </Tabs>
    </div>
  );
}
