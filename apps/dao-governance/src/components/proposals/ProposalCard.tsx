import { Badge, Card } from '@blockchain-playground/ui';
import { Calendar, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  calculateVotingProgress,
  formatRelativeTime,
  formatTimeRemaining,
  formatTokenAmount,
  getProposalStatusColor,
} from '@/lib/utils';
import type { Proposal } from '@/types';

interface ProposalCardProps {
  proposal: Proposal;
}

export default function ProposalCard({ proposal }: ProposalCardProps) {
  const timeRemaining = formatTimeRemaining(proposal.endTime);
  const { forPercentage, againstPercentage } = calculateVotingProgress(
    proposal.forVotes,
    proposal.againstVotes,
    proposal.abstainVotes
  );

  const totalVotes =
    BigInt(proposal.forVotes) + BigInt(proposal.againstVotes) + BigInt(proposal.abstainVotes);
  const formattedTotalVotes = formatTokenAmount(totalVotes.toString(), 18, 0);

  return (
    <Link to={`/proposals/${proposal.id}`}>
      <Card className="proposal-card group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className={getProposalStatusColor(proposal.status)}>
                {proposal.status.toUpperCase()}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {proposal.type.toUpperCase()}
              </Badge>
            </div>
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
              {proposal.title}
            </h3>
          </div>
        </div>

        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {proposal.description.replace(/[#*]/g, '').split('\n')[0]}
        </p>

        {/* Voting Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Voting Progress</span>
            <span className="font-medium">{formattedTotalVotes} votes</span>
          </div>

          <div className="w-full bg-muted rounded-full h-2 mb-2">
            <div className="flex h-full rounded-full overflow-hidden">
              <div className="bg-green-500" style={{ width: `${forPercentage}%` }} />
              <div className="bg-red-500" style={{ width: `${againstPercentage}%` }} />
            </div>
          </div>

          <div className="flex justify-between text-xs text-muted-foreground">
            <span className="text-green-600">For: {forPercentage.toFixed(1)}%</span>
            <span className="text-red-600">Against: {againstPercentage.toFixed(1)}%</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatRelativeTime(proposal.createdAt)}</span>
            </div>

            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{formattedTotalVotes}</span>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span className={timeRemaining === 'Ended' ? 'text-red-500' : 'text-orange-500'}>
              {timeRemaining}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
