import { Button, Input } from '@blockchain-playground/ui';
import { MessageSquare, Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import DiscussionCard from '@/components/discussion/DiscussionCard';
import { useDiscussionStore } from '@/stores/discussionStore';

export default function Discussions() {
  const { isConnected } = useAccount();
  const {
    discussions,
    isLoading,
    error,
    searchTerm,
    selectedTags,
    loadDiscussions,
    setSearchTerm,
    setSelectedTags,
  } = useDiscussionStore();

  const [localSearchTerm, setLocalSearchTerm] = useState('');

  useEffect(() => {
    loadDiscussions();
  }, [loadDiscussions]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(localSearchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchTerm, setSearchTerm]);

  // Get unique tags from all discussions
  const allTags = Array.from(new Set(discussions.flatMap((d) => d.tags))).sort();

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">Error loading discussions: {error}</div>
        <Button onClick={() => loadDiscussions()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Community Discussions</h1>
          <p className="text-muted-foreground mt-2">
            Engage with the community on governance topics and proposals.
          </p>
        </div>

        {isConnected && (
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Start Discussion</span>
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search discussions..."
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Tag Filters */}
          {allTags.length > 0 && (
            <div>
              <div className="text-sm font-medium mb-2">Filter by tags:</div>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Filters */}
          {(searchTerm || selectedTags.length > 0) && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchTerm && (
                <div className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs">
                  Search: "{searchTerm}"
                </div>
              )}
              {selectedTags.map((tag) => (
                <div key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs">
                  Tag: {tag}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">Showing {discussions.length} discussions</div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid gap-4">
          {['skeleton-1', 'skeleton-2', 'skeleton-3'].map((skeletonId) => (
            <div
              key={skeletonId}
              className="bg-card border border-border rounded-lg p-4 animate-pulse"
            >
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <div className="h-4 w-20 bg-muted rounded"></div>
                  <div className="h-4 w-16 bg-muted rounded"></div>
                </div>
                <div className="h-5 w-3/4 bg-muted rounded"></div>
                <div className="h-12 w-full bg-muted rounded"></div>
                <div className="flex justify-between">
                  <div className="h-3 w-32 bg-muted rounded"></div>
                  <div className="h-3 w-24 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Discussions List */}
      {!isLoading && discussions.length > 0 && (
        <div className="grid gap-4">
          {discussions.map((discussion) => (
            <DiscussionCard key={discussion.id} discussion={discussion} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && discussions.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Discussions Found</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm || selectedTags.length > 0
              ? 'No discussions match your current filters.'
              : 'No discussions have been started yet.'}
          </p>

          <div className="flex justify-center space-x-4">
            {(searchTerm || selectedTags.length > 0) && (
              <Button
                variant="outline"
                onClick={() => {
                  setLocalSearchTerm('');
                  setSearchTerm('');
                  setSelectedTags([]);
                }}
              >
                Clear Filters
              </Button>
            )}

            {isConnected && <Button>Start First Discussion</Button>}
          </div>
        </div>
      )}
    </div>
  );
}
