import { Badge, Button, Card } from '@blockchain-playground/ui';
import { ArrowLeft, Calendar, ExternalLink, User } from 'lucide-react';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import VoteButton from '@/components/voting/VoteButton';
import VotingStats from '@/components/voting/VotingStats';
import { formatRelativeTime, getProposalStatusColor, shortenAddress } from '@/lib/utils';
import { useGovernanceStore } from '@/stores/governanceStore';

export default function ProposalDetail() {
  const { id } = useParams<{ id: string }>();
  const { selectedProposal, isLoading, error, loadProposal } = useGovernanceStore();

  useEffect(() => {
    if (id) {
      loadProposal(id);
    }
  }, [id, loadProposal]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 w-32 bg-muted rounded mb-4"></div>
          <div className="h-10 w-3/4 bg-muted rounded mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-64 bg-muted rounded"></div>
            </div>
            <div className="space-y-4">
              <div className="h-32 bg-muted rounded"></div>
              <div className="h-48 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !selectedProposal) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">{error || 'Proposal not found'}</div>
        <Link to="/proposals">
          <Button>Back to Proposals</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        to="/proposals"
        className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Proposals</span>
      </Link>

      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Badge className={getProposalStatusColor(selectedProposal.status)}>
            {selectedProposal.status.toUpperCase()}
          </Badge>
          <Badge variant="outline">{selectedProposal.type.toUpperCase()}</Badge>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-4">{selectedProposal.title}</h1>

        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>Proposed by {shortenAddress(selectedProposal.proposer)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatRelativeTime(selectedProposal.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Proposal Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Proposal Description</h3>
            <div className="markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {selectedProposal.description}
              </ReactMarkdown>
            </div>
          </Card>

          {/* Actions */}
          {selectedProposal.actions && selectedProposal.actions.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Proposed Actions</h3>
              <div className="space-y-4">
                {selectedProposal.actions.map((action, index) => (
                  <div
                    key={`${action.target}-${action.signature}-${index}`}
                    className="border border-border rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Action #{index + 1}</span>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View on Explorer
                      </Button>
                    </div>
                    <div className="text-sm space-y-2">
                      <div>
                        <span className="text-muted-foreground">Target:</span>{' '}
                        <code className="bg-muted px-2 py-1 rounded text-xs">{action.target}</code>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Function:</span>{' '}
                        <code className="bg-muted px-2 py-1 rounded text-xs">
                          {action.signature}
                        </code>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Description:</span>{' '}
                        {action.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Voting Buttons */}
          {selectedProposal.status === 'active' && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Cast Your Vote</h3>
              <div className="flex space-x-4">
                <VoteButton proposalId={selectedProposal.id} support="for" className="flex-1" />
                <VoteButton proposalId={selectedProposal.id} support="against" className="flex-1" />
                <VoteButton proposalId={selectedProposal.id} support="abstain" className="flex-1" />
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <VotingStats proposal={selectedProposal} />

          {/* Discussion Link */}
          <Card className="p-6">
            <h4 className="font-medium mb-3">Join the Discussion</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Share your thoughts and engage with the community about this proposal.
            </p>
            <Link to={`/discussions?proposal=${selectedProposal.id}`}>
              <Button variant="outline" className="w-full">
                View Discussion
              </Button>
            </Link>
          </Card>

          {/* Proposal Details */}
          <Card className="p-6">
            <h4 className="font-medium mb-3">Proposal Details</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Proposal ID:</span>
                <span className="font-mono">{selectedProposal.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quorum:</span>
                <span>{selectedProposal.quorum}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Threshold:</span>
                <span>{selectedProposal.threshold}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Start Time:</span>
                <span>{new Date(selectedProposal.startTime * 1000).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">End Time:</span>
                <span>{new Date(selectedProposal.endTime * 1000).toLocaleDateString()}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
