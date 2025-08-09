import { Card } from '@blockchain-playground/ui';
import { Coins, TrendingUp, Users, Zap } from 'lucide-react';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { formatTokenAmount } from '@/lib/utils';
import { useGovernanceStore } from '@/stores/governanceStore';

export default function GovernanceTokenDisplay() {
  const { address, isConnected } = useAccount();
  const { governanceToken, votingPower, loadVotingPower } = useGovernanceStore();

  useEffect(() => {
    if (address && isConnected) {
      loadVotingPower(address);
    }
  }, [address, isConnected, loadVotingPower]);

  if (!isConnected || !address) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <Coins className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
          <p className="text-muted-foreground">
            Connect your wallet to view your governance token balance and voting power.
          </p>
        </div>
      </Card>
    );
  }

  if (!votingPower || !governanceToken) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 bg-muted rounded"></div>
            <div className="h-16 bg-muted rounded"></div>
          </div>
        </div>
      </Card>
    );
  }

  const tokenBalance = formatTokenAmount(votingPower.balance, governanceToken.decimals);
  const delegatedOut = formatTokenAmount(votingPower.delegated, governanceToken.decimals);
  const delegatedIn = formatTokenAmount(votingPower.received, governanceToken.decimals);
  const totalVotingPower = formatTokenAmount(votingPower.votingPower, governanceToken.decimals);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Governance Token Balance</h3>
          <p className="text-sm text-muted-foreground">
            {governanceToken.name} ({governanceToken.symbol})
          </p>
        </div>
        <div className="flex items-center space-x-2 text-green-600">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm font-medium">Active</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-primary/5 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Coins className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Token Balance</span>
          </div>
          <div className="text-2xl font-bold text-primary">{tokenBalance}</div>
          <div className="text-xs text-muted-foreground">{governanceToken.symbol} tokens</div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Voting Power</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{totalVotingPower}</div>
          <div className="text-xs text-muted-foreground">Effective votes</div>
        </div>
      </div>

      {/* Delegation Information */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-medium mb-3">Delegation Details</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Users className="h-3 w-3 text-orange-500" />
              <span className="text-xs text-muted-foreground">Delegated Out</span>
            </div>
            <div className="font-semibold text-orange-600">
              {delegatedOut} {governanceToken.symbol}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Users className="h-3 w-3 text-green-500" />
              <span className="text-xs text-muted-foreground">Delegated In</span>
            </div>
            <div className="font-semibold text-green-600">
              +{delegatedIn} {governanceToken.symbol}
            </div>
          </div>
        </div>
      </div>

      {/* Block Information */}
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Last updated at block #{votingPower.blockNumber.toLocaleString()}</span>
          <span>Auto-refresh enabled</span>
        </div>
      </div>
    </Card>
  );
}
