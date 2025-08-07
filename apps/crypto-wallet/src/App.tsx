import { Wallet } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useAccount } from 'wagmi';
import { BalanceCard } from './components/BalanceCard';
import { ChainSwitcher } from './components/ChainSwitcher';
import { TransferForm } from './components/TransferForm';
import { WalletConnect } from './components/WalletConnect';

function App() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-background">
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'text-sm',
          duration: 4000,
        }}
      />

      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">Crypto Wallet</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">Multi-chain Crypto Wallet</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A modern Web3 wallet with MetaMask integration, balance tracking, and multi-chain
              support for Ethereum and Polygon networks.
            </p>
          </div>

          {/* Wallet Connection */}
          <WalletConnect />

          {/* Connected Features */}
          {isConnected && (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <BalanceCard />
                <ChainSwitcher />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <TransferForm />
              </div>
            </div>
          )}

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 pt-8">
            <div className="text-center p-6 rounded-lg border">
              <Wallet className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">MetaMask Integration</h3>
              <p className="text-muted-foreground">
                Seamless connection with MetaMask and other Web3 wallets
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border">
              <div className="h-12 w-12 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold">⚡</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Multi-chain Support</h3>
              <p className="text-muted-foreground">
                Support for Ethereum, Polygon, and their testnets
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border">
              <div className="h-12 w-12 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold">🔒</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Transactions</h3>
              <p className="text-muted-foreground">
                Safe and secure transaction handling with real-time updates
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
