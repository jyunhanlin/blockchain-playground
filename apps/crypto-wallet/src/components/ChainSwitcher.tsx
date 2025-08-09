import { Button, Card, CardContent, CardHeader, CardTitle } from '@blockchain-playground/ui';
import { Network } from 'lucide-react';
import { useChainId, useSwitchChain } from 'wagmi';
import { getChainConfig, supportedChains } from '@/lib/chains';

export function ChainSwitcher() {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const currentConfig = getChainConfig(chainId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
            <Network className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Network</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentConfig?.name || 'Unknown Network'}
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {supportedChains.map((chain) => {
            const config = getChainConfig(chain.id);
            const isActive = chain.id === chainId;

            return (
              <Button
                key={chain.id}
                variant="outline"
                size="sm"
                onClick={() => switchChain({ chainId: chain.id })}
                disabled={isActive}
                className={`w-full justify-start h-11 border ${
                  isActive
                    ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/20 dark:border-blue-800 dark:text-blue-300'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isActive
                        ? 'bg-blue-500 ring-2 ring-blue-200 dark:ring-blue-800'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  ></div>
                  <span className="font-medium">{config?.name || chain.name}</span>
                  {isActive && (
                    <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      Active
                    </span>
                  )}
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
