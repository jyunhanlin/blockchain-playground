import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@blockchain-playground/ui';
import { ArrowRightLeft, Droplets, Github, TrendingUp, Twitter } from 'lucide-react';
import { useState } from 'react';
import { LiquidityInterface } from '@/components/LiquidityInterface';
import { PriceChart } from '@/components/PriceChart';
import { SwapInterface } from '@/components/SwapInterface';
import { WalletConnect, WalletInfo } from '@/components/WalletConnect';

function App() {
  const [activeTab, setActiveTab] = useState('swap');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <ArrowRightLeft className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Simple DEX
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <WalletConnect />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Trading Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Decentralized Trading Made Simple</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Trade tokens, provide liquidity, and earn fees on our user-friendly decentralized
                exchange. Built with the latest Web3 technologies for a seamless experience.
              </p>
            </div>

            {/* Trading Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="swap" className="flex items-center gap-2">
                  <ArrowRightLeft className="h-4 w-4" />
                  Swap
                </TabsTrigger>
                <TabsTrigger value="liquidity" className="flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  Liquidity
                </TabsTrigger>
              </TabsList>

              <TabsContent value="swap" className="space-y-6">
                <SwapInterface />

                {/* Swap Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="text-center p-4">
                    <ArrowRightLeft className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-semibold mb-1">Instant Swaps</h3>
                    <p className="text-sm text-muted-foreground">
                      Trade tokens instantly with minimal slippage
                    </p>
                  </Card>

                  <Card className="text-center p-4">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <h3 className="font-semibold mb-1">Best Prices</h3>
                    <p className="text-sm text-muted-foreground">
                      Get optimal prices through smart routing
                    </p>
                  </Card>

                  <Card className="text-center p-4">
                    <Droplets className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <h3 className="font-semibold mb-1">Low Fees</h3>
                    <p className="text-sm text-muted-foreground">
                      Only 0.3% trading fee shared with liquidity providers
                    </p>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="liquidity" className="space-y-6">
                <LiquidityInterface />

                {/* Liquidity Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-blue-600" />
                      Earn Trading Fees
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Provide liquidity and earn 0.3% of all trading fees proportional to your pool
                      share.
                    </p>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      LP Token Rewards
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Receive LP tokens representing your pool share that can be redeemed anytime.
                    </p>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Price Chart & Wallet Info */}
          <div className="space-y-6">
            <PriceChart />
            <WalletInfo />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Value Locked
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12.4M</div>
                  <p className="text-xs text-muted-foreground">+5.2% from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    24h Volume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2.8M</div>
                  <p className="text-xs text-muted-foreground">+12.3% from yesterday</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <ArrowRightLeft className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold">Simple DEX</span>
              </div>
              <p className="text-sm text-muted-foreground">
                A decentralized exchange for seamless token trading and liquidity provision.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Token Swap</li>
                <li>Liquidity Pools</li>
                <li>Price Analytics</li>
                <li>Portfolio Tracking</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Smart Contracts</li>
                <li>Security Audits</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Discord</li>
                <li>Twitter</li>
                <li>GitHub</li>
                <li>Telegram</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
