import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@blockchain-playground/ui';
import { ChevronDown, LogOut, Settings, User, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAccount, useDisconnect } from 'wagmi';
import { shortenAddress } from '@/lib/utils';
import { useGovernanceStore } from '@/stores/governanceStore';
import WalletConnect from '../governance/WalletConnect';

export default function Navbar() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { governanceToken } = useGovernanceStore();

  return (
    <nav className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">DAO</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Governance Platform</h1>
              {governanceToken && (
                <p className="text-xs text-muted-foreground">
                  {governanceToken.name} ({governanceToken.symbol})
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/dashboard"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/proposals"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Proposals
          </Link>
          <Link
            to="/discussions"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Discussions
          </Link>
          <Link
            to="/voting-history"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Voting History
          </Link>
        </div>

        {/* Wallet Connection */}
        <div className="flex items-center space-x-4">
          {isConnected && address ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Wallet className="h-4 w-4" />
                  <span>{shortenAddress(address)}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Link to="/profile" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => disconnect()}>
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Disconnect</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <WalletConnect />
          )}
        </div>
      </div>
    </nav>
  );
}
