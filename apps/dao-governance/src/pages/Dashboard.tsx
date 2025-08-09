import { Card } from '@blockchain-playground/ui';
import { Clock, FileText, MessageSquare, Target, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import GovernanceTokenDisplay from '@/components/governance/GovernanceTokenDisplay';
import ProposalCard from '@/components/proposals/ProposalCard';
import { mockDAOMetrics } from '@/lib/mock-data';
import { formatTokenAmount } from '@/lib/utils';
import { useGovernanceStore } from '@/stores/governanceStore';

export default function Dashboard() {
  const { isConnected } = useAccount();
  const { proposals } = useGovernanceStore();

  // Get active proposals for preview
  const activeProposals = proposals.filter((p) => p.status === 'active').slice(0, 3);

  const stats = [
    {
      label: 'Total Proposals',
      value: mockDAOMetrics.totalProposals.toString(),
      icon: FileText,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Active Proposals',
      value: mockDAOMetrics.activeProposals.toString(),
      icon: Clock,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Total Voters',
      value: mockDAOMetrics.totalVoters.toLocaleString(),
      icon: Users,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      label: 'Participation Rate',
      value: `${mockDAOMetrics.averageParticipation.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">DAO Governance Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Participate in decentralized decision-making and shape the future of our protocol.
        </p>
      </div>

      {/* Governance Token Balance */}
      <GovernanceTokenDisplay />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Treasury Overview */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Treasury Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Treasury Value</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {formatTokenAmount(mockDAOMetrics.treasuryValue, 18, 0)} GOV
            </div>
            <div className="text-xs text-muted-foreground">
              ≈ $
              {(
                Number(formatTokenAmount(mockDAOMetrics.treasuryValue, 18, 0).replace(/,/g, '')) *
                1.23
              ).toLocaleString()}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Token Holders</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {mockDAOMetrics.tokenHolders.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">+127 this month</div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Quorum Rate</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {mockDAOMetrics.quorumRate.toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">Last 30 days</div>
          </div>
        </div>
      </Card>

      {/* Active Proposals */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Active Proposals</h3>
          <Link to="/proposals" className="text-primary hover:underline text-sm">
            View all proposals →
          </Link>
        </div>

        {activeProposals.length > 0 ? (
          <div className="grid gap-4">
            {activeProposals.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="font-medium mb-2">No Active Proposals</h4>
            <p className="text-muted-foreground mb-4">
              There are currently no active proposals to vote on.
            </p>
            {isConnected && (
              <Link to="/create-proposal">
                <button
                  type="button"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Create Proposal
                </button>
              </Link>
            )}
          </Card>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <h4 className="font-medium">Create Proposal</h4>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            Submit a new proposal for community voting and discussion.
          </p>
          <Link to="/create-proposal">
            <button
              type="button"
              className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Create New Proposal
            </button>
          </Link>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <MessageSquare className="h-5 w-5 text-green-600" />
            </div>
            <h4 className="font-medium">Join Discussion</h4>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            Participate in community discussions about governance and proposals.
          </p>
          <Link to="/discussions">
            <button
              type="button"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              View Discussions
            </button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
