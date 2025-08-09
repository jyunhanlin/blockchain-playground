import { Badge, Button, Card } from '@blockchain-playground/ui';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, Clock, DollarSign, ExternalLink, Gift, TrendingUp, Zap } from 'lucide-react';
import { cn, formatCurrency, formatPercentage } from '@/lib/utils';
import type { UserPosition } from '@/types';

interface PositionCardProps {
  position: UserPosition;
  onClaim: (positionId: string) => void;
  onToggleAutoCompound: (positionId: string) => void;
  onWithdraw: (positionId: string) => void;
  onViewDetails: (poolId: string) => void;
  isLoading?: boolean;
}

export function PositionCard({
  position,
  onClaim,
  onToggleAutoCompound,
  onWithdraw,
  onViewDetails,
  isLoading = false,
}: PositionCardProps) {
  const totalPendingValue = position.pendingRewards.reduce((sum, reward) => sum + reward.value, 0);
  const hasRewards = totalPendingValue > 0;
  const gainLoss = position.value - position.amount;
  const gainLossPercentage = ((position.value - position.amount) / position.amount) * 100;
  const isProfit = gainLoss >= 0;

  const daysSinceDeposit = Math.floor(
    (Date.now() - position.depositedAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{position.pool.protocol.icon}</div>
            <div>
              <h3 className="font-semibold text-lg">{position.pool.name}</h3>
              <p className="text-sm text-muted-foreground">
                {position.pool.protocol.name} • {position.pool.depositToken.symbol}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {position.autoCompound && (
              <Badge variant="secondary" className="text-xs">
                <Zap className="h-3 w-3 mr-1" />
                Auto
              </Badge>
            )}
            <Button variant="outline" size="sm" onClick={() => onViewDetails(position.pool.id)}>
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Position Value */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center space-x-1">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Current Value</span>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(position.value)}</p>
            <p className="text-sm text-muted-foreground">
              Deposited: {formatCurrency(position.amount)}
            </p>
          </div>

          <div>
            <div className="flex items-center space-x-1">
              <TrendingUp className={cn('h-4 w-4', isProfit ? 'text-green-600' : 'text-red-600')} />
              <span className="text-sm font-medium">P&L</span>
            </div>
            <p className={cn('text-2xl font-bold', isProfit ? 'text-green-600' : 'text-red-600')}>
              {isProfit ? '+' : ''}
              {formatCurrency(gainLoss)}
            </p>
            <p className={cn('text-sm font-medium', isProfit ? 'text-green-600' : 'text-red-600')}>
              {isProfit ? '+' : ''}
              {formatPercentage(gainLossPercentage)}
            </p>
          </div>
        </div>

        {/* APY and Duration */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Est. APY</span>
            </div>
            <p className="text-lg font-bold text-blue-600">
              {formatPercentage(position.estimatedApy)}
            </p>
          </div>

          <div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Duration</span>
            </div>
            <p className="text-lg font-bold">{daysSinceDeposit} days</p>
            <p className="text-xs text-muted-foreground">
              Since {formatDistanceToNow(position.depositedAt)} ago
            </p>
          </div>
        </div>

        {/* Pending Rewards */}
        {hasRewards && (
          <div className="border-t pt-4">
            <div className="flex items-center space-x-1 mb-2">
              <Gift className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium">Pending Rewards</span>
            </div>

            <div className="space-y-2">
              {position.pendingRewards.map((reward) => (
                <div key={reward.token.address} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{reward.token.icon}</span>
                    <span className="text-sm font-medium">{reward.token.symbol}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {reward.amount.toFixed(6)} {reward.token.symbol}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatCurrency(reward.value)}
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between pt-2 border-t">
                <span className="font-medium">Total Value:</span>
                <span className="font-bold text-yellow-600">
                  {formatCurrency(totalPendingValue)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Last Claimed */}
        {position.lastClaimedAt && (
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Last claimed {formatDistanceToNow(position.lastClaimedAt)} ago</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          {hasRewards && (
            <Button onClick={() => onClaim(position.id)} disabled={isLoading} className="flex-1">
              <Gift className="h-4 w-4 mr-2" />
              Claim {formatCurrency(totalPendingValue)}
            </Button>
          )}

          <Button
            variant="outline"
            onClick={() => onToggleAutoCompound(position.id)}
            disabled={isLoading}
          >
            <Zap className="h-4 w-4 mr-2" />
            {position.autoCompound ? 'Disable' : 'Enable'} Auto
          </Button>

          <Button variant="outline" onClick={() => onWithdraw(position.id)} disabled={isLoading}>
            Withdraw
          </Button>
        </div>
      </div>
    </Card>
  );
}
