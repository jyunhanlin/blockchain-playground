import { Avatar, Badge, Card } from '@blockchain-playground/ui';
import { Calendar, MessageSquare, TrendingUp, Trophy, User, Vote } from 'lucide-react';
import { useAccount } from 'wagmi';
import { mockUserProfile } from '@/lib/mock-data';
import { formatRelativeTime, shortenAddress } from '@/lib/utils';

export default function Profile() {
  const { address, isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          Please connect your wallet to view your profile
        </div>
      </div>
    );
  }

  const profile = {
    ...mockUserProfile,
    address: address || mockUserProfile.address,
  };

  const stats = [
    {
      label: 'Voting Power',
      value: `${(Number(profile.votingPower) / 1e18).toLocaleString()} GOV`,
      icon: Vote,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Proposals Created',
      value: profile.proposalsCreated.toString(),
      icon: MessageSquare,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Votes Cast',
      value: profile.votesCount.toString(),
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      label: 'Reputation',
      value: profile.reputation.toString(),
      icon: Trophy,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-2">
          Your governance activity and participation history.
        </p>
      </div>

      {/* Profile Card */}
      <Card className="p-6">
        <div className="flex items-start space-x-6">
          <Avatar className="h-20 w-20">
            {profile.avatar ? (
              <img src={profile.avatar} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <User className="h-10 w-10" />
            )}
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-xl font-semibold">
                {profile.ens || shortenAddress(profile.address)}
              </h2>
              <Badge variant="outline">Active Member</Badge>
            </div>

            <div className="text-muted-foreground mb-4">
              <div className="flex items-center space-x-1 mb-1">
                <span>Address:</span>
                <code className="bg-muted px-2 py-1 rounded text-xs">{profile.address}</code>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Member since {formatRelativeTime(profile.joinedAt)}</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <div
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${stat.bg} mb-2`}
                    >
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div className="text-lg font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Governance Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Governance Activity</h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Participation Rate</span>
              <div className="text-right">
                <div className="font-semibold">87.5%</div>
                <div className="text-xs text-green-600">Above average</div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Proposals Supported</span>
              <div className="text-right">
                <div className="font-semibold">15</div>
                <div className="text-xs text-muted-foreground">Passed: 12</div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Delegations Received</span>
              <div className="text-right">
                <div className="font-semibold">{profile.delegationsCount}</div>
                <div className="text-xs text-muted-foreground">500K GOV delegated</div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Average Vote Weight</span>
              <div className="text-right">
                <div className="font-semibold">1.2M GOV</div>
                <div className="text-xs text-muted-foreground">Per proposal</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>

          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm font-medium">Voted on Treasury Proposal</div>
                <div className="text-xs text-muted-foreground">2 hours ago</div>
              </div>
              <Badge className="bg-green-100 text-green-700">FOR</Badge>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm font-medium">Created discussion thread</div>
                <div className="text-xs text-muted-foreground">1 day ago</div>
              </div>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm font-medium">Delegated voting power</div>
                <div className="text-xs text-muted-foreground">3 days ago</div>
              </div>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm font-medium">Voted against Protocol Update</div>
                <div className="text-xs text-muted-foreground">5 days ago</div>
              </div>
              <Badge className="bg-red-100 text-red-700">AGAINST</Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Reputation Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Reputation Breakdown</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">+450</div>
            <div className="text-sm text-muted-foreground">Proposal Votes</div>
            <div className="text-xs text-muted-foreground mt-1">
              Consistent participation in governance
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">+300</div>
            <div className="text-sm text-muted-foreground">Community Engagement</div>
            <div className="text-xs text-muted-foreground mt-1">
              Active in discussions and debates
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">+97</div>
            <div className="text-sm text-muted-foreground">Delegation Trust</div>
            <div className="text-xs text-muted-foreground mt-1">
              Others delegate voting power to you
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="h-5 w-5 text-orange-600" />
            <span className="font-medium text-orange-800">Top 5% Contributor</span>
          </div>
          <div className="text-sm text-orange-700">
            Your governance participation ranks in the top 5% of all DAO members. Keep up the
            excellent work!
          </div>
        </div>
      </Card>
    </div>
  );
}
