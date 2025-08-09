import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@blockchain-playground/ui';
import { LogOut, Wallet } from 'lucide-react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { formatAddress } from '@/lib/utils';

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/10 dark:border-green-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <Wallet className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="text-green-700 dark:text-green-300">Connected Wallet</span>
            </div>
          </CardTitle>
          <CardDescription>Your wallet is connected and ready to use</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Wallet Address</p>
              <div className="flex items-center gap-2">
                <code className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded border">
                  {formatAddress(address, 6)}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(address)}
                  className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                  title="Copy address"
                >
                  📋
                </Button>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => disconnect()}
              className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/20"
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
    <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/10 dark:border-blue-800">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-3 text-xl">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <Wallet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-gray-900 dark:text-white">Connect Your Wallet</span>
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
          Connect your wallet to start using the crypto wallet and access all features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {connectors.map((connector) => (
            <Button
              key={connector.uid}
              onClick={() => connect({ connector })}
              className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all"
              size="lg"
            >
              <span className="mr-2">🦊</span>
              Connect with {connector.name}
            </Button>
          ))}
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            By connecting, you agree to our terms and conditions
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
