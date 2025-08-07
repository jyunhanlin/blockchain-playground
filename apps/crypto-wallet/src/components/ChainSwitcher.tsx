import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supportedChains } from '@/lib/chains';
import { getChainConfig } from '@/lib/chains';
import { Network } from 'lucide-react';
import { useChainId, useSwitchChain } from 'wagmi';

export function ChainSwitcher() {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const currentConfig = getChainConfig(chainId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="h-5 w-5" />
          Network
        </CardTitle>
        <CardDescription>
          Currently connected to {currentConfig?.name || 'Unknown Network'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {supportedChains.map((chain) => {
            const config = getChainConfig(chain.id);
            const isActive = chain.id === chainId;

            return (
              <Button
                key={chain.id}
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                onClick={() => switchChain({ chainId: chain.id })}
                disabled={isActive}
                className="justify-start"
              >
                {config?.name || chain.name}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
