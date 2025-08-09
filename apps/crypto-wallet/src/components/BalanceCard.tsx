import { Card, CardContent, CardHeader, CardTitle } from '@blockchain-playground/ui';
import { Coins } from 'lucide-react';
import { useAccount, useBalance, useChainId } from 'wagmi';
import { getChainConfig } from '@/lib/chains';
import { formatBalance, formatCurrency } from '@/lib/utils';

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
            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Coins className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Portfolio Balance
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Wallet not connected</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Connect your wallet to view balance
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Coins className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Portfolio Balance
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Loading network...</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <div className="animate-pulse">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-2 mx-auto w-48" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mx-auto w-24" />
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2">
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <span>Loading...</span>
              </div>
            </div>
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
            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900 flex items-center justify-center">
              <Coins className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Portfolio Balance
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Error loading data</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-red-600 dark:text-red-400 text-sm">
                Unable to load balance information
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Please check your connection and try again
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <Coins className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Portfolio Balance
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {chainConfig?.name || 'Unknown Network'}
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatBalance(balance?.formatted || '0')} {balance?.symbol}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">≈ {formatCurrency(0)} USD</p>
          </div>

          <div className="flex items-center justify-center gap-4 pt-2">
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Live Price</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <span>+0.00%</span>
              <span>24h</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
