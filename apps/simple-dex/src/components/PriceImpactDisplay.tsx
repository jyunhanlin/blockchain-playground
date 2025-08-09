import { AlertTriangle, Info } from 'lucide-react';
import type { Token } from '@/lib/chains';
import { cn } from '@/lib/utils';

interface PriceImpactDisplayProps {
  priceImpact: number;
  fromToken: Token | null;
  toToken: Token | null;
  fromAmount: string;
  toAmount: string;
}

export function PriceImpactDisplay({
  priceImpact,
  fromToken,
  toToken,
  fromAmount,
  toAmount,
}: PriceImpactDisplayProps) {
  const getImpactColor = (impact: number) => {
    if (impact < 1) return 'text-green-600';
    if (impact < 3) return 'text-yellow-600';
    if (impact < 5) return 'text-orange-600';
    return 'text-red-600';
  };

  const getImpactBg = (impact: number) => {
    if (impact < 1) return 'bg-green-50 border-green-200';
    if (impact < 3) return 'bg-yellow-50 border-yellow-200';
    if (impact < 5) return 'bg-orange-50 border-orange-200';
    return 'bg-red-50 border-red-200';
  };

  const getExchangeRate = () => {
    if (!fromAmount || !toAmount || !fromToken || !toToken || Number.parseFloat(fromAmount) === 0) {
      return null;
    }

    const rate = Number.parseFloat(toAmount) / Number.parseFloat(fromAmount);
    return `1 ${fromToken.symbol} = ${rate.toFixed(6)} ${toToken.symbol}`;
  };

  const exchangeRate = getExchangeRate();

  return (
    <div className="space-y-3">
      {/* Exchange Rate */}
      {exchangeRate && (
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Info className="h-3 w-3" />
            <span>Rate</span>
          </div>
          <span className="font-mono">{exchangeRate}</span>
        </div>
      )}

      {/* Price Impact */}
      {priceImpact > 0 && (
        <div className={cn('p-3 rounded-lg border', getImpactBg(priceImpact))}>
          <div className="flex items-center gap-2">
            {priceImpact >= 3 && (
              <AlertTriangle className={cn('h-4 w-4', getImpactColor(priceImpact))} />
            )}
            <span className="text-sm font-medium">
              Price Impact:
              <span className={cn('ml-1', getImpactColor(priceImpact))}>
                {priceImpact.toFixed(2)}%
              </span>
            </span>
          </div>

          {priceImpact >= 5 && (
            <p className="text-xs text-muted-foreground mt-1">
              High price impact! Consider splitting your trade into smaller amounts.
            </p>
          )}
          {priceImpact >= 3 && priceImpact < 5 && (
            <p className="text-xs text-muted-foreground mt-1">
              Moderate price impact. Double-check your trade details.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
