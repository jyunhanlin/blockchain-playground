import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Textarea,
} from '@blockchain-playground/ui';
import { Loader2, Minus, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAccount } from 'wagmi';
import { useGovernanceStore } from '@/stores/governanceStore';
import type { VoteSupport } from '@/types';

interface VoteButtonProps {
  proposalId: string;
  support: VoteSupport;
  disabled?: boolean;
  className?: string;
}

const voteConfig = {
  for: {
    icon: ThumbsUp,
    label: 'Vote For',
    color: 'bg-green-100 text-green-700 hover:bg-green-200',
    description: 'Vote in favor of this proposal',
  },
  against: {
    icon: ThumbsDown,
    label: 'Vote Against',
    color: 'bg-red-100 text-red-700 hover:bg-red-200',
    description: 'Vote against this proposal',
  },
  abstain: {
    icon: Minus,
    label: 'Abstain',
    color: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    description: 'Abstain from voting on this proposal',
  },
};

export default function VoteButton({
  proposalId,
  support,
  disabled = false,
  className,
}: VoteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState('');
  const { isConnected } = useAccount();
  const { vote, isLoading } = useGovernanceStore();

  const config = voteConfig[support];
  const Icon = config.icon;

  const handleVote = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet to vote');
      return;
    }

    try {
      await vote(proposalId, support, reason || undefined);
      toast.success(`Vote cast successfully: ${config.label}`);
      setIsOpen(false);
      setReason('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to cast vote');
    }
  };

  if (!isConnected) {
    return (
      <Button variant="outline" disabled className={`vote-button ${support} ${className}`}>
        <Icon className="h-4 w-4 mr-2" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled || isLoading}
          className={`vote-button ${support} ${className}`}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Icon className="h-4 w-4 mr-2" />
          )}
          {config.label}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Icon className="h-5 w-5" />
            <span>{config.label}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {config.description}. Your vote will be recorded on-chain and cannot be changed.
          </p>

          <div>
            <label htmlFor="vote-reason" className="text-sm font-medium block mb-2">
              Reason (Optional)
            </label>
            <Textarea
              id="vote-reason"
              placeholder="Explain your reasoning for this vote..."
              value={reason}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReason(e.target.value)}
              rows={4}
              maxLength={500}
            />
            <div className="text-xs text-muted-foreground mt-1">{reason.length}/500 characters</div>
          </div>

          <div className="bg-muted/50 rounded-lg p-3">
            <h4 className="font-medium text-sm mb-2">Vote Summary</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Action:</span>
                <span className="font-medium">{config.label}</span>
              </div>
              <div className="flex justify-between">
                <span>Voting Power:</span>
                <span className="font-medium">1,000,000 GOV</span>
              </div>
              <div className="flex justify-between">
                <span>Gas Fee:</span>
                <span className="font-medium">~$5.00</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleVote} disabled={isLoading} className={config.color}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Voting...
              </>
            ) : (
              <>
                <Icon className="h-4 w-4 mr-2" />
                Confirm Vote
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
