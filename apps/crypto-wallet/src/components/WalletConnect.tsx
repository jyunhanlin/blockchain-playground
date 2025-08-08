import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@blockchain-playground/ui';
import { formatAddress } from '@/lib/utils';
import { LogOut, Wallet } from 'lucide-react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Connected Wallet
          </CardTitle>
          <CardDescription>Your wallet is connected and ready to use</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-mono">{formatAddress(address, 6)}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => disconnect()}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Disconnect
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Connect Wallet
        </CardTitle>
        <CardDescription>Connect your wallet to start using the crypto wallet</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {connectors.map((connector) => (
            <Button
              key={connector.uid}
              onClick={() => connect({ connector })}
              className="w-full"
              variant="outline"
            >
              {connector.name}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
