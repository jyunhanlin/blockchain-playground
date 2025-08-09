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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'text-sm',
          duration: 4000,
        }}
      />

      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm dark:bg-gray-950/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
              <Wallet className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Crypto Wallet</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Web3 Multi-chain Wallet</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-6 py-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Multi-chain Crypto Wallet
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                A modern Web3 wallet with MetaMask integration, balance tracking, and multi-chain
                support for Ethereum and Polygon networks.
              </p>
            </div>
          </div>

          {/* Wallet Connection */}
          <WalletConnect />

          {/* Connected Features */}
          {isConnected && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  Wallet Dashboard
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage your crypto assets and transactions
                </p>
              </div>

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
            </div>
          )}

          {/* Features */}
          <div className="space-y-8 pt-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Key Features
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Everything you need for secure and efficient crypto management
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  MetaMask Integration
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Seamless connection with MetaMask and other Web3 wallets
                </p>
              </div>

              <div className="text-center p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mx-auto mb-4 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center">
                  <span className="text-orange-600 dark:text-orange-400 text-xl">⚡</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  Multi-chain Support
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Support for Ethereum, Polygon, and their testnets
                </p>
              </div>

              <div className="text-center p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 text-xl">🔒</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  Secure Transactions
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Safe and secure transaction handling with real-time updates
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
