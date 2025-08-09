import { Badge, Button, Card, Progress } from '@blockchain-playground/ui';
import {
  Clock,
  DollarSign,
  PieChart,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { cn, formatCurrency, formatPercentage } from '@/lib/utils';
import type { Portfolio } from '@/types';

interface PortfolioOverviewProps {
  portfolio: Portfolio;
  onRefresh: () => void;
  isLoading?: boolean;
}

export function PortfolioOverview({
  portfolio,
  onRefresh,
  isLoading = false,
}: PortfolioOverviewProps) {
  const isProfitable = portfolio.pnl >= 0;
  const isPositiveChange = portfolio.pnlPercentage >= 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Portfolio Overview</h2>
          <p className="text-muted-foreground">Track your DeFi investments and yields</p>
        </div>
        <Button variant="outline" size="sm" onClick={onRefresh} disabled={isLoading}>
          <RefreshCw className={cn('h-4 w-4 mr-2', isLoading && 'animate-spin')} />
          Refresh
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Value */}
        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-muted-foreground">Total Value</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">{formatCurrency(portfolio.totalValue)}</div>
            <div className="text-sm text-muted-foreground">
              Deposited: {formatCurrency(portfolio.totalDeposited)}
            </div>
          </div>
        </Card>

        {/* P&L */}
        <Card className="p-6">
          <div className="flex items-center space-x-2">
            {isProfitable ? (
              <TrendingUp className="h-5 w-5 text-green-600" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-600" />
            )}
            <span className="text-sm font-medium text-muted-foreground">Profit & Loss</span>
          </div>
          <div className="mt-2">
            <div
              className={cn('text-2xl font-bold', isProfitable ? 'text-green-600' : 'text-red-600')}
            >
              {isProfitable ? '+' : ''}
              {formatCurrency(portfolio.pnl)}
            </div>
            <div
              className={cn(
                'text-sm font-medium',
                isPositiveChange ? 'text-green-600' : 'text-red-600'
              )}
            >
              {isPositiveChange ? '+' : ''}
              {formatPercentage(portfolio.pnlPercentage)}
            </div>
          </div>
        </Card>

        {/* Total Rewards */}
        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-medium text-muted-foreground">Total Rewards</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-yellow-600">
              {formatCurrency(portfolio.totalRewards)}
            </div>
            <div className="text-sm text-muted-foreground">
              Fees: {formatCurrency(portfolio.totalFees)}
            </div>
          </div>
        </Card>

        {/* Active Positions */}
        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <PieChart className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-muted-foreground">Positions</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">{portfolio.positions.length}</div>
            <div className="text-sm text-muted-foreground">Active pools</div>
          </div>
        </Card>
      </div>

      {/* Yield Projections */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold">Yield Projections</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Daily</div>
            <div className="text-xl font-bold text-green-600">
              {formatCurrency(portfolio.dailyRewards)}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatPercentage((portfolio.dailyRewards / portfolio.totalValue) * 100)}
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Monthly</div>
            <div className="text-xl font-bold text-blue-600">
              {formatCurrency(portfolio.monthlyRewards)}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatPercentage((portfolio.monthlyRewards / portfolio.totalValue) * 100)}
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Yearly</div>
            <div className="text-xl font-bold text-purple-600">
              {formatCurrency(portfolio.yearlyProjection)}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatPercentage((portfolio.yearlyProjection / portfolio.totalValue) * 100)}
            </div>
          </div>
        </div>
      </Card>

      {/* Portfolio Allocation */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Portfolio Allocation</h3>

        <div className="space-y-4">
          {portfolio.positions.map((position) => {
            const allocation = (position.value / portfolio.totalValue) * 100;
            const isAutoCompound = position.autoCompound;

            return (
              <div key={position.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-lg">{position.pool.protocol.icon}</div>
                    <div>
                      <div className="font-medium">{position.pool.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {position.pool.protocol.name}
                      </div>
                    </div>
                    {isAutoCompound && (
                      <Badge variant="secondary" className="text-xs">
                        <Zap className="h-3 w-3 mr-1" />
                        Auto
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(position.value)}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatPercentage(allocation)}
                    </div>
                  </div>
                </div>
                <Progress value={allocation} className="h-2" />
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
