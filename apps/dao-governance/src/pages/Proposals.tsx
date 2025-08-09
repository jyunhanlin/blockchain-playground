import { Button } from '@blockchain-playground/ui';
import { FileText, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import ProposalCard from '@/components/proposals/ProposalCard';
import ProposalFilters from '@/components/proposals/ProposalFilters';
import { useGovernanceStore } from '@/stores/governanceStore';
import type { ProposalType } from '@/types';

export default function Proposals() {
  const { isConnected } = useAccount();
  const { proposals, isLoading, error, statusFilter, setStatusFilter, loadProposals } =
    useGovernanceStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<ProposalType | 'all'>('all');
  const [filteredProposals, setFilteredProposals] = useState(proposals);

  // Apply client-side filters
  useEffect(() => {
    let filtered = [...proposals];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (proposal) =>
          proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          proposal.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter((proposal) => proposal.type === typeFilter);
    }

    setFilteredProposals(filtered);
  }, [proposals, searchTerm, typeFilter]);

  const handleReset = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setStatusFilter('all');
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">Error loading proposals: {error}</div>
        <Button onClick={loadProposals}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Proposals</h1>
          <p className="text-muted-foreground mt-2">
            Browse and vote on governance proposals to shape the future of the protocol.
          </p>
        </div>

        {isConnected && (
          <Link to="/create-proposal">
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Create Proposal</span>
            </Button>
          </Link>
        )}
      </div>

      {/* Filters */}
      <ProposalFilters
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onSearchChange={setSearchTerm}
        onTypeFilterChange={setTypeFilter}
        onReset={handleReset}
      />

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredProposals.length} of {proposals.length} proposals
        </div>

        {statusFilter !== 'all' && (
          <div className="text-sm text-primary">
            Filtered by: {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid gap-6">
          {['skeleton-1', 'skeleton-2', 'skeleton-3'].map((skeletonId) => (
            <div
              key={skeletonId}
              className="bg-card border border-border rounded-lg p-6 animate-pulse"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2 flex-1">
                  <div className="flex space-x-2">
                    <div className="h-5 w-16 bg-muted rounded"></div>
                    <div className="h-5 w-20 bg-muted rounded"></div>
                  </div>
                  <div className="h-6 w-3/4 bg-muted rounded"></div>
                </div>
              </div>
              <div className="h-16 w-full bg-muted rounded mb-4"></div>
              <div className="flex justify-between">
                <div className="h-4 w-32 bg-muted rounded"></div>
                <div className="h-4 w-24 bg-muted rounded"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Proposals List */}
      {!isLoading && filteredProposals.length > 0 && (
        <div className="grid gap-6">
          {filteredProposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredProposals.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Proposals Found</h3>
          <p className="text-muted-foreground mb-6">
            {proposals.length === 0
              ? 'No proposals have been created yet.'
              : 'No proposals match your current filters.'}
          </p>

          <div className="flex justify-center space-x-4">
            {filteredProposals.length === 0 && proposals.length > 0 && (
              <Button variant="outline" onClick={handleReset}>
                Clear Filters
              </Button>
            )}

            {isConnected && (
              <Link to="/create-proposal">
                <Button>Create First Proposal</Button>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Pagination would go here in a real app */}
      {filteredProposals.length > 10 && (
        <div className="flex justify-center pt-6">
          <div className="text-sm text-muted-foreground">
            Showing all {filteredProposals.length} proposals
          </div>
        </div>
      )}
    </div>
  );
}
