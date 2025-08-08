import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@blockchain-playground/ui';
import { getChainConfig } from '@/lib/chains';
import { formatBalance, formatCurrency } from '@/lib/utils';
import { Coins } from 'lucide-react';
import { useAccount, useBalance, useChainId } from 'wagmi';

export function BalanceCard() {
  const { address } = useAccount();
  const chainId = useChainId();
  const {
    data: balance,
    isLoading,
    error,
  } = useBalance({
    address,
  });

  const chainConfig = getChainConfig(chainId);

  if (!address) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Balance
          </CardTitle>
          <CardDescription>Connect your wallet to view balance</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded mb-2" />
            <div className="h-4 bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Error loading balance</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5" />
          Balance
        </CardTitle>
        <CardDescription>
          Current balance on {chainConfig?.name || 'Unknown Network'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <p className="text-2xl font-bold">
              {formatBalance(balance?.formatted || '0')} {balance?.symbol}
            </p>
            <p className="text-sm text-muted-foreground">
              ≈ {formatCurrency(0)} {/* TODO: Add price conversion */}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
