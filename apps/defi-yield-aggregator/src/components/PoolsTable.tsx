import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@blockchain-playground/ui';
import { ArrowUpDown, ExternalLink, Shield, TrendingUp } from 'lucide-react';
import type React from 'react';
import { cn, formatCurrency, formatPercentage, getApyColor, getRiskColor } from '@/lib/utils';
import type { YieldPool } from '@/types';
import { SortOption } from '@/types';

interface PoolsTableProps {
  pools: YieldPool[];
  sortBy: SortOption;
  sortOrder: 'asc' | 'desc';
  onSort: (sortBy: SortOption) => void;
  onDeposit: (poolId: string) => void;
  onViewDetails: (poolId: string) => void;
}

export function PoolsTable({
  pools,
  sortBy,

  onSort,
  onDeposit,
  onViewDetails,
}: PoolsTableProps) {
  const handleSort = (column: SortOption) => {
    onSort(column);
  };

  const SortButton = ({ column, children }: { column: SortOption; children: React.ReactNode }) => (
    <button
      type="button"
      onClick={() => handleSort(column)}
      className="flex items-center space-x-1 hover:text-foreground transition-colors"
    >
      <span>{children}</span>
      <ArrowUpDown
        className={cn('h-4 w-4', sortBy === column ? 'text-foreground' : 'text-muted-foreground')}
      />
    </button>
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">
              <SortButton column={SortOption.NAME}>Pool</SortButton>
            </TableHead>
            <TableHead>
              <SortButton column={SortOption.CATEGORY}>Protocol</SortButton>
            </TableHead>
            <TableHead className="text-right">
              <SortButton column={SortOption.APY}>APY</SortButton>
            </TableHead>
            <TableHead className="text-right">
              <SortButton column={SortOption.TVL}>TVL</SortButton>
            </TableHead>
            <TableHead>
              <SortButton column={SortOption.RISK}>Risk</SortButton>
            </TableHead>
            <TableHead>Strategy</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pools.map((pool) => {
            const riskColorClass = getRiskColor(pool.riskLevel);
            const apyColorClass = getApyColor(pool.apy);

            return (
              <TableRow key={pool.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="text-xl">{pool.protocol.icon}</div>
                    <div>
                      <div className="font-medium">{pool.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {pool.depositToken.symbol}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{pool.protocol.name}</div>
                    <Badge variant="outline" className="text-xs capitalize">
                      {pool.protocol.category.replace('_', ' ')}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className={cn('font-bold text-lg', apyColorClass)}>
                    {formatPercentage(pool.apy)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    APR: {formatPercentage(pool.apr)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="font-semibold">{formatCurrency(pool.tvl, 'USD', 0)}</div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <Badge className={riskColorClass}>{pool.riskLevel.toUpperCase()}</Badge>
                    <div className="flex items-center space-x-1">
                      <Shield className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-muted-foreground">
                        {pool.protocol.riskScore.toFixed(1)}/10
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm capitalize">{pool.strategy.replace('_', ' ')}</div>
                  {pool.lockupPeriod > 0 && (
                    <div className="text-xs text-orange-600">{pool.lockupPeriod}d lockup</div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex space-x-2 justify-end">
                    <Button size="sm" onClick={() => onDeposit(pool.id)}>
                      Deposit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onViewDetails(pool.id)}>
                      Details
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(pool.protocol.website, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {pools.length === 0 && (
        <div className="text-center py-12">
          <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No pools found</h3>
          <p className="text-muted-foreground">Try adjusting your filters to see more pools.</p>
        </div>
      )}
    </div>
  );
}
