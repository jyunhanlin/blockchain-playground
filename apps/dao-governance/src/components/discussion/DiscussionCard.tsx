import { Badge, Card } from '@blockchain-playground/ui';
import { Clock, MessageSquare, ThumbsDown, ThumbsUp, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatRelativeTime, shortenAddress } from '@/lib/utils';
import type { Discussion } from '@/types';

interface DiscussionCardProps {
  discussion: Discussion;
}

export default function DiscussionCard({ discussion }: DiscussionCardProps) {
  return (
    <Link to={`/discussions/${discussion.id}`}>
      <Card className="discussion-card">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {discussion.proposalId && (
                <Badge variant="outline" className="text-xs">
                  Proposal Discussion
                </Badge>
              )}
              {discussion.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
              {discussion.title}
            </h3>
          </div>
        </div>

        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{discussion.content}</p>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{shortenAddress(discussion.author)}</span>
            </div>

            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{formatRelativeTime(discussion.timestamp)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <MessageSquare className="h-3 w-3" />
              <span>{discussion.replies.length}</span>
            </div>

            <div className="flex items-center space-x-1">
              <ThumbsUp className="h-3 w-3 text-green-600" />
              <span>{discussion.upvotes}</span>
            </div>

            <div className="flex items-center space-x-1">
              <ThumbsDown className="h-3 w-3 text-red-600" />
              <span>{discussion.downvotes}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
