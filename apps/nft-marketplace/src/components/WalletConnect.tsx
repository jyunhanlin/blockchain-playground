import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from '@blockchain-playground/ui';
import { Wallet, LogOut } from 'lucide-react';
import { formatAddress } from '@/lib/utils';

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{formatAddress(address)}</span>
        <Button onClick={() => disconnect()} variant="outline" size="sm" className="gap-2">
          <LogOut className="h-4 w-4" />
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      {connectors.map((connector) => (
        <Button
          key={connector.uid}
          onClick={() => connect({ connector })}
          disabled={isPending}
          className="gap-2"
        >
          <Wallet className="h-4 w-4" />
          Connect {connector.name}
        </Button>
      ))}
    </div>
  );
}
