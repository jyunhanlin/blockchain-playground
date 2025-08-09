import { Badge, Button, Card, Textarea } from '@blockchain-playground/ui';
import { ArrowLeft, MessageSquare, Send, ThumbsDown, ThumbsUp, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { formatRelativeTime, shortenAddress } from '@/lib/utils';
import { useDiscussionStore } from '@/stores/discussionStore';
import type { Reply } from '@/types';

export default function DiscussionDetail() {
  const { id } = useParams<{ id: string }>();
  const { isConnected } = useAccount();
  const {
    selectedDiscussion,
    isLoading,
    error,
    loadDiscussion,
    addReply,
    voteOnDiscussion,
    voteOnReply,
  } = useDiscussionStore();

  const [replyContent, setReplyContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadDiscussion(id);
    }
  }, [id, loadDiscussion]);

  const handleAddReply = async () => {
    if (!replyContent.trim() || !selectedDiscussion) return;

    try {
      await addReply(selectedDiscussion.id, replyContent, replyingTo || undefined);
      setReplyContent('');
      setReplyingTo(null);
    } catch (error) {
      console.error('Failed to add reply:', error);
    }
  };

  const handleVoteDiscussion = async (isUpvote: boolean) => {
    if (!selectedDiscussion) return;
    try {
      await voteOnDiscussion(selectedDiscussion.id, isUpvote);
    } catch (error) {
      console.error('Failed to vote on discussion:', error);
    }
  };

  const handleVoteReply = async (replyId: string, isUpvote: boolean) => {
    try {
      await voteOnReply(replyId, isUpvote);
    } catch (error) {
      console.error('Failed to vote on reply:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-32 bg-muted rounded"></div>
        <div className="h-10 w-3/4 bg-muted rounded"></div>
        <div className="h-64 bg-muted rounded"></div>
      </div>
    );
  }

  if (error || !selectedDiscussion) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">{error || 'Discussion not found'}</div>
        <Link to="/discussions">
          <Button>Back to Discussions</Button>
        </Link>
      </div>
    );
  }

  // Group replies by parent
  const topLevelReplies = selectedDiscussion.replies.filter((reply) => !reply.parentId);
  const nestedReplies = selectedDiscussion.replies.filter((reply) => reply.parentId);

  const getRepliesForParent = (parentId: string): Reply[] => {
    return nestedReplies.filter((reply) => reply.parentId === parentId);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Link
        to="/discussions"
        className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Discussions</span>
      </Link>

      {/* Discussion Header */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {selectedDiscussion.proposalId && (
                <Badge variant="outline">Proposal Discussion</Badge>
              )}
              {selectedDiscussion.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-2xl font-bold text-foreground">{selectedDiscussion.title}</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{shortenAddress(selectedDiscussion.author)}</span>
          </div>
          <div>{formatRelativeTime(selectedDiscussion.timestamp)}</div>
        </div>

        <div className="prose prose-sm max-w-none mb-6">
          <p className="text-foreground whitespace-pre-wrap">{selectedDiscussion.content}</p>
        </div>

        {/* Discussion Voting */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleVoteDiscussion(true)}
              disabled={!isConnected}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              {selectedDiscussion.upvotes}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleVoteDiscussion(false)}
              disabled={!isConnected}
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              {selectedDiscussion.downvotes}
            </Button>
          </div>

          <div className="flex items-center space-x-1 text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span>{selectedDiscussion.replies.length} replies</span>
          </div>
        </div>
      </Card>

      {/* Add Reply */}
      {isConnected && (
        <Card className="p-6">
          <h3 className="font-medium mb-3">{replyingTo ? 'Reply to comment' : 'Add a reply'}</h3>

          {replyingTo && (
            <div className="bg-muted/50 rounded-lg p-3 mb-3">
              <div className="text-sm text-muted-foreground">Replying to:</div>
              <div className="text-sm">
                {selectedDiscussion.replies
                  .find((r) => r.id === replyingTo)
                  ?.content?.slice(0, 100)}
                ...
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setReplyingTo(null)}
                className="mt-2"
              >
                Cancel Reply
              </Button>
            </div>
          )}

          <div className="space-y-3">
            <Textarea
              placeholder="Share your thoughts on this discussion..."
              value={replyContent}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setReplyContent(e.target.value)
              }
              rows={4}
              maxLength={1000}
            />
            <div className="flex justify-between items-center">
              <div className="text-xs text-muted-foreground">
                {replyContent.length}/1000 characters
              </div>
              <Button onClick={handleAddReply} disabled={!replyContent.trim() || isLoading}>
                <Send className="h-4 w-4 mr-2" />
                Post Reply
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Replies */}
      <div className="space-y-4">
        {topLevelReplies.map((reply) => (
          <Card key={reply.id} className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{shortenAddress(reply.author)}</span>
              <span className="text-xs text-muted-foreground">
                {formatRelativeTime(reply.timestamp)}
              </span>
            </div>

            <div className="mb-3">
              <p className="text-sm text-foreground whitespace-pre-wrap">{reply.content}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleVoteReply(reply.id, true)}
                  disabled={!isConnected}
                >
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  {reply.upvotes}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleVoteReply(reply.id, false)}
                  disabled={!isConnected}
                >
                  <ThumbsDown className="h-3 w-3 mr-1" />
                  {reply.downvotes}
                </Button>
              </div>

              {isConnected && (
                <Button variant="outline" size="sm" onClick={() => setReplyingTo(reply.id)}>
                  Reply
                </Button>
              )}
            </div>

            {/* Nested Replies */}
            {getRepliesForParent(reply.id).length > 0 && (
              <div className="mt-4 ml-6 space-y-3 border-l-2 border-muted pl-4">
                {getRepliesForParent(reply.id).map((nestedReply) => (
                  <div key={nestedReply.id} className="bg-muted/30 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs font-medium">
                        {shortenAddress(nestedReply.author)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatRelativeTime(nestedReply.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-foreground whitespace-pre-wrap mb-2">
                      {nestedReply.content}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVoteReply(nestedReply.id, true)}
                        disabled={!isConnected}
                        className="h-6 px-2 text-xs"
                      >
                        <ThumbsUp className="h-2 w-2 mr-1" />
                        {nestedReply.upvotes}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVoteReply(nestedReply.id, false)}
                        disabled={!isConnected}
                        className="h-6 px-2 text-xs"
                      >
                        <ThumbsDown className="h-2 w-2 mr-1" />
                        {nestedReply.downvotes}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}

        {topLevelReplies.length === 0 && (
          <Card className="p-8 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="font-medium mb-2">No replies yet</h4>
            <p className="text-muted-foreground">
              Be the first to share your thoughts on this discussion.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
