import { Button, Card } from '@blockchain-playground/ui';
import { getChainName } from '@/lib/chains';
import { formatAddress } from '@/lib/utils';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ChevronDown, Wallet } from 'lucide-react';
import { useAccount, useBalance, useChainId } from 'wagmi';

export function WalletConnect() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button onClick={openConnectModal} className="gradient-bg">
                    <Wallet className="h-4 w-4 mr-2" />
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} variant="destructive">
                    Wrong Network
                  </Button>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  <Button onClick={openChainModal} variant="outline" size="sm" className="h-8">
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 16,
                          height: 16,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 16, height: 16 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>

                  <Button onClick={openAccountModal} variant="outline" className="h-8">
                    <Wallet className="h-3 w-3 mr-2" />
                    {formatAddress(account.address)}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

export function WalletInfo() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balance } = useBalance({ address });

  if (!isConnected || !address) {
    return (
      <Card className="p-6 text-center">
        <Wallet className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
        <p className="text-muted-foreground mb-4">
          Connect your wallet to start trading and providing liquidity
        </p>
        <WalletConnect />
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Wallet Info</h3>
        <WalletConnect />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Address</span>
          <span className="font-mono text-sm">{formatAddress(address)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Network</span>
          <span className="text-sm">{getChainName(chainId)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Balance</span>
          <span className="font-mono text-sm">
            {balance
              ? `${Number.parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}`
              : '0.00'}
          </span>
        </div>
      </div>
    </Card>
  );
}
