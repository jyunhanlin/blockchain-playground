import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@blockchain-playground/ui';
import { Loader2, Wallet } from 'lucide-react';
import { useState } from 'react';
import { useAccount, useConnect } from 'wagmi';

export default function WalletConnect() {
  const { connectors, connect, isPending } = useConnect();
  const { isConnecting } = useAccount();
  const [isOpen, setIsOpen] = useState(false);

  const handleConnect = (connector: any) => {
    connect({ connector });
    setIsOpen(false);
  };

  if (isPending || isConnecting) {
    return (
      <Button disabled className="flex items-center space-x-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Connecting...</span>
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center space-x-2">
          <Wallet className="h-4 w-4" />
          <span>Connect Wallet</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground mb-4">
            Connect your wallet to participate in governance, vote on proposals, and engage with the
            community.
          </p>

          {connectors.map((connector) => (
            <Button
              key={connector.uid}
              variant="outline"
              className="w-full justify-start h-12"
              onClick={() => handleConnect(connector)}
              disabled={!connector.available}
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-muted rounded flex items-center justify-center">
                  <Wallet className="h-3 w-3" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{connector.name}</div>
                  {!connector.available && (
                    <div className="text-xs text-muted-foreground">Not available</div>
                  )}
                </div>
              </div>
            </Button>
          ))}

          <div className="text-xs text-muted-foreground text-center mt-4">
            By connecting, you agree to our Terms of Service and Privacy Policy.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
