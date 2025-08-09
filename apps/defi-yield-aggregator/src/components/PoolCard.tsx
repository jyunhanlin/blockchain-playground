import { Card, Badge, Button, Progress } from '@blockchain-playground/ui';
import { Star, TrendingUp, Shield, Clock, ExternalLink } from 'lucide-react';
import type { YieldPool } from '@/types';
import { formatCurrency, formatPercentage, getRiskColor, getApyColor, cn } from '@/lib/utils';

interface PoolCardProps {
  pool: YieldPool;
  onDeposit?: (poolId: string) => void;
  onViewDetails?: (poolId: string) => void;
  isCompact?: boolean;
}

export function PoolCard({ pool, onDeposit, onViewDetails, isCompact = false }: PoolCardProps) {
  const riskColorClass = getRiskColor(pool.riskLevel);
  const apyColorClass = getApyColor(pool.apy);

  // Calculate risk score for progress bar
  const riskScore = pool.protocol.riskScore;
  const riskPercentage = (riskScore / 10) * 100;

  const handleDeposit = () => {
    onDeposit?.(pool.id);
  };

  const handleViewDetails = () => {
    onViewDetails?.(pool.id);
  };

  return (
    <Card
      className={cn(
        'p-6 hover:shadow-lg transition-all duration-200 border-l-4',
        pool.riskLevel === 'low' && 'border-l-green-500',
        pool.riskLevel === 'medium' && 'border-l-yellow-500',
        pool.riskLevel === 'high' && 'border-l-orange-500',
        pool.riskLevel === 'extreme' && 'border-l-red-500',
        isCompact && 'p-4'
      )}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{pool.protocol.icon}</div>
            <div>
              <h3 className="font-semibold text-lg">{pool.name}</h3>
              <p className="text-sm text-muted-foreground">
                {pool.protocol.name} • {pool.depositToken.symbol}
              </p>
            </div>
          </div>
          <Badge variant="outline" className={riskColorClass}>
            {pool.riskLevel.toUpperCase()}
          </Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">APY</span>
            </div>
            <p className={cn('text-2xl font-bold', apyColorClass)}>{formatPercentage(pool.apy)}</p>
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">TVL</span>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(pool.tvl, 'USD', 0)}</p>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Shield className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium">Risk Score</span>
            </div>
            <span className="text-sm font-bold">{riskScore.toFixed(1)}/10</span>
          </div>
          <Progress value={riskPercentage} className="h-2" />
        </div>

        {/* Additional Info */}
        {!isCompact && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Min Deposit:</span>
              <span className="ml-2 font-medium">
                {pool.minimumDeposit} {pool.depositToken.symbol}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Strategy:</span>
              <span className="ml-2 font-medium capitalize">{pool.strategy.replace('_', ' ')}</span>
            </div>
            {pool.lockupPeriod > 0 && (
              <div className="col-span-2">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3 text-orange-500" />
                  <span className="text-muted-foreground">Lockup:</span>
                  <span className="ml-1 font-medium text-orange-600">{pool.lockupPeriod} days</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Fees */}
        {!isCompact &&
          (pool.fees.deposit > 0 || pool.fees.withdrawal > 0 || pool.fees.performance > 0) && (
            <div className="border-t pt-3">
              <div className="text-sm space-y-1">
                <h4 className="font-medium">Fees</h4>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {pool.fees.deposit > 0 && (
                    <div>
                      <span className="text-muted-foreground">Deposit:</span>
                      <span className="ml-1">{formatPercentage(pool.fees.deposit)}</span>
                    </div>
                  )}
                  {pool.fees.withdrawal > 0 && (
                    <div>
                      <span className="text-muted-foreground">Withdrawal:</span>
                      <span className="ml-1">{formatPercentage(pool.fees.withdrawal)}</span>
                    </div>
                  )}
                  {pool.fees.performance > 0 && (
                    <div>
                      <span className="text-muted-foreground">Performance:</span>
                      <span className="ml-1">{formatPercentage(pool.fees.performance)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button onClick={handleDeposit} className="flex-1">
            Deposit
          </Button>
          <Button variant="outline" onClick={handleViewDetails} className="flex-1">
            Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(pool.protocol.website, '_blank')}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
