import { Card } from '@blockchain-playground/ui';
import { Clock, Target, TrendingUp, Users } from 'lucide-react';
import {
  calculateVotingProgress,
  formatTimeRemaining,
  formatTokenAmount,
  isQuorumMet,
  isThresholdMet,
} from '@/lib/utils';
import type { Proposal } from '@/types';

interface VotingStatsProps {
  proposal: Proposal;
}

export default function VotingStats({ proposal }: VotingStatsProps) {
  const { forPercentage, againstPercentage, abstainPercentage } = calculateVotingProgress(
    proposal.forVotes,
    proposal.againstVotes,
    proposal.abstainVotes
  );

  const totalVotes =
    BigInt(proposal.forVotes) + BigInt(proposal.againstVotes) + BigInt(proposal.abstainVotes);
  const quorumMet = isQuorumMet(totalVotes.toString(), proposal.quorum);
  const thresholdMet = isThresholdMet(proposal.forVotes, proposal.againstVotes, proposal.threshold);
  const timeRemaining = formatTimeRemaining(proposal.endTime);

  const stats = [
    {
      label: 'Total Votes',
      value: formatTokenAmount(totalVotes.toString(), 18, 0),
      icon: Users,
      color: 'text-blue-600',
    },
    {
      label: 'Quorum',
      value: `${formatTokenAmount(proposal.quorum, 18, 0)} ${quorumMet ? '✓' : '✗'}`,
      icon: Target,
      color: quorumMet ? 'text-green-600' : 'text-red-600',
    },
    {
      label: 'Threshold',
      value: `${proposal.threshold}% ${thresholdMet ? '✓' : '✗'}`,
      icon: TrendingUp,
      color: thresholdMet ? 'text-green-600' : 'text-red-600',
    },
    {
      label: 'Time Remaining',
      value: timeRemaining,
      icon: Clock,
      color: timeRemaining === 'Ended' ? 'text-red-600' : 'text-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Voting Progress */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Voting Results</h3>

        <div className="space-y-4">
          {/* For Votes */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-green-700">For</span>
              <span className="text-sm font-bold text-green-700">
                {formatTokenAmount(proposal.forVotes, 18, 0)} ({forPercentage.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${forPercentage}%` }}
              />
            </div>
          </div>

          {/* Against Votes */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-red-700">Against</span>
              <span className="text-sm font-bold text-red-700">
                {formatTokenAmount(proposal.againstVotes, 18, 0)} ({againstPercentage.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div
                className="bg-red-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${againstPercentage}%` }}
              />
            </div>
          </div>

          {/* Abstain Votes */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Abstain</span>
              <span className="text-sm font-bold text-gray-700">
                {formatTokenAmount(proposal.abstainVotes, 18, 0)} ({abstainPercentage.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div
                className="bg-gray-400 h-3 rounded-full transition-all duration-300"
                style={{ width: `${abstainPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Outcome Prediction */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">Current Outcome</h4>
          <div className="text-sm">
            {proposal.status === 'active' ? (
              <div>
                <div className="mb-2">
                  <span className={`font-medium ${quorumMet ? 'text-green-600' : 'text-red-600'}`}>
                    Quorum: {quorumMet ? 'Met' : 'Not Met'}
                  </span>
                </div>
                <div>
                  <span
                    className={`font-medium ${thresholdMet ? 'text-green-600' : 'text-red-600'}`}
                  >
                    Threshold: {thresholdMet ? 'Met' : 'Not Met'}
                  </span>
                </div>
                <div className="mt-2 text-muted-foreground">
                  {quorumMet && thresholdMet
                    ? '✅ Proposal is currently passing'
                    : '❌ Proposal is currently failing'}
                </div>
              </div>
            ) : (
              <div
                className={`font-medium ${
                  proposal.status === 'succeeded' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                Final Result: {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                  <div className={`font-semibold ${stat.color}`}>{stat.value}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
