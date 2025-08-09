import { Button } from '@blockchain-playground/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Home as HomeIcon, Palette, Plus, Search, User } from 'lucide-react';
import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import { WalletConnect } from './components/WalletConnect';
import { config } from './lib/wagmi';
import { Create } from './pages/Create';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';

const queryClient = new QueryClient();

function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Palette className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">NFT Marketplace</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="flex items-center gap-2 text-sm font-medium hover:text-primary">
              <HomeIcon className="h-4 w-4" />
              Home
            </a>
            <a
              href="/create"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary"
            >
              <Plus className="h-4 w-4" />
              Create
            </a>
            <a
              href="/profile"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary"
            >
              <User className="h-4 w-4" />
              Profile
            </a>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>

          {/* Wallet Connect */}
          <div className="flex items-center gap-4">
            <WalletConnect />

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-label="Menu"
              >
                <title>Menu</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-4">
              <a
                href="/"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary"
              >
                <HomeIcon className="h-4 w-4" />
                Home
              </a>
              <a
                href="/create"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary"
              >
                <Plus className="h-4 w-4" />
                Create
              </a>
              <a
                href="/profile"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary"
              >
                <User className="h-4 w-4" />
                Profile
              </a>
              <Button variant="outline" size="sm" className="gap-2 w-fit">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Palette className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">NFT Marketplace</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The world's leading NFT marketplace for digital art and collectibles.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Marketplace</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="/browse" className="block hover:text-foreground">
                Browse NFTs
              </a>
              <a href="/collections" className="block hover:text-foreground">
                Collections
              </a>
              <a href="/artists" className="block hover:text-foreground">
                Artists
              </a>
              <a href="/rankings" className="block hover:text-foreground">
                Rankings
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Create</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="/create" className="block hover:text-foreground">
                Mint NFT
              </a>
              <a href="/create-collection" className="block hover:text-foreground">
                Create Collection
              </a>
              <a href="/guidelines" className="block hover:text-foreground">
                Guidelines
              </a>
              <a href="/gas-tracker" className="block hover:text-foreground">
                Gas Tracker
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="/help" className="block hover:text-foreground">
                Help Center
              </a>
              <a href="/contact" className="block hover:text-foreground">
                Contact Us
              </a>
              <a href="/terms" className="block hover:text-foreground">
                Terms of Service
              </a>
              <a href="/privacy" className="block hover:text-foreground">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 NFT Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1 container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
