import { Badge, Card, Table } from '@blockchain-playground/ui';
import { Calendar, ExternalLink, Filter } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { mockVotes } from '@/lib/mock-data';
import { formatRelativeTime, getVoteSupportColor, shortenAddress } from '@/lib/utils';
import { useGovernanceStore } from '@/stores/governanceStore';
import type { Vote } from '@/types';

export default function VotingHistory() {
  const { isConnected, address } = useAccount();
  const { proposals } = useGovernanceStore();
  const [votes, setVotes] = useState<Vote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading votes
    const loadVotes = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would filter by current user's address
      const userVotes = mockVotes.map((vote) => ({
        ...vote,
        voter: address || vote.voter,
      }));

      setVotes(userVotes);
      setIsLoading(false);
    };

    if (isConnected) {
      loadVotes();
    } else {
      setIsLoading(false);
    }
  }, [isConnected, address]);

  // Get proposal title for each vote
  const getProposalTitle = (proposalId: string) => {
    const proposal = proposals.find((p) => p.id === proposalId);
    return proposal?.title || `Proposal ${proposalId}`;
  };

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          Please connect your wallet to view your voting history
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Voting History</h1>
        <p className="text-muted-foreground mt-2">
          Track your participation in governance decisions and voting activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-bold text-foreground">{votes.length}</div>
          <div className="text-sm text-muted-foreground">Total Votes</div>
        </Card>

        <Card className="p-4">
          <div className="text-2xl font-bold text-green-600">
            {votes.filter((v) => v.support === 'for').length}
          </div>
          <div className="text-sm text-muted-foreground">For Votes</div>
        </Card>

        <Card className="p-4">
          <div className="text-2xl font-bold text-red-600">
            {votes.filter((v) => v.support === 'against').length}
          </div>
          <div className="text-sm text-muted-foreground">Against Votes</div>
        </Card>

        <Card className="p-4">
          <div className="text-2xl font-bold text-gray-600">
            {votes.filter((v) => v.support === 'abstain').length}
          </div>
          <div className="text-sm text-muted-foreground">Abstain Votes</div>
        </Card>
      </div>

      {/* Voting History Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Recent Votes</h3>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">All Votes</span>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {['skeleton-1', 'skeleton-2', 'skeleton-3', 'skeleton-4', 'skeleton-5'].map(
              (skeletonId) => (
                <div key={skeletonId} className="animate-pulse">
                  <div className="grid grid-cols-5 gap-4 py-3">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded"></div>
                  </div>
                </div>
              )
            )}
          </div>
        ) : votes.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="font-medium mb-2">No Voting History</h4>
            <p className="text-muted-foreground">
              You haven't cast any votes yet. Start participating in governance!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">Proposal</th>
                  <th className="text-left py-3 px-4 font-medium">Vote</th>
                  <th className="text-left py-3 px-4 font-medium">Voting Power</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Transaction</th>
                </tr>
              </thead>
              <tbody>
                {votes.map((vote) => (
                  <tr key={vote.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium line-clamp-1">
                          {getProposalTitle(vote.proposalId)}
                        </div>
                        <div className="text-xs text-muted-foreground">{vote.proposalId}</div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <Badge className={getVoteSupportColor(vote.support)}>
                        {vote.support.toUpperCase()}
                      </Badge>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-medium">
                        {(Number(vote.weight) / 1e18).toLocaleString()} GOV
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="text-sm">{formatRelativeTime(vote.timestamp)}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(vote.timestamp * 1000).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <a
                        href={`https://etherscan.io/tx/${vote.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-primary hover:underline"
                      >
                        <span className="text-sm">{shortenAddress(vote.transactionHash)}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {/* Reason Display */}
        {votes.some((v) => v.reason) && (
          <div className="mt-6">
            <h4 className="font-medium mb-3">Recent Vote Reasons</h4>
            <div className="space-y-3">
              {votes
                .filter((v) => v.reason)
                .slice(0, 3)
                .map((vote) => (
                  <div key={vote.id} className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">{getProposalTitle(vote.proposalId)}</div>
                      <Badge className={getVoteSupportColor(vote.support)}>
                        {vote.support.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">"{vote.reason}"</div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
