export interface GovernanceToken {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  totalSupply: string;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  status: ProposalStatus;
  type: ProposalType;
  votingPower: string;
  forVotes: string;
  againstVotes: string;
  abstainVotes: string;
  quorum: string;
  threshold: string;
  startTime: number;
  endTime: number;
  executionTime?: number;
  createdAt: number;
  updatedAt: number;
  actions?: ProposalAction[];
}

export type ProposalStatus =
  | 'draft'
  | 'active'
  | 'succeeded'
  | 'defeated'
  | 'queued'
  | 'executed'
  | 'cancelled'
  | 'expired';

export type ProposalType = 'constitutional' | 'treasury' | 'technical' | 'social' | 'emergency';

export interface ProposalAction {
  target: string;
  value: string;
  calldata: string;
  signature: string;
  description: string;
}

export interface Vote {
  id: string;
  proposalId: string;
  voter: string;
  support: VoteSupport;
  weight: string;
  reason?: string;
  timestamp: number;
  transactionHash: string;
}

export type VoteSupport = 'for' | 'against' | 'abstain';

export interface VotingPower {
  address: string;
  balance: string;
  delegated: string;
  received: string;
  votingPower: string;
  blockNumber: number;
}

export interface Delegation {
  id: string;
  delegator: string;
  delegatee: string;
  amount: string;
  timestamp: number;
  transactionHash: string;
}

export interface Discussion {
  id: string;
  proposalId?: string;
  author: string;
  title: string;
  content: string;
  timestamp: number;
  replies: Reply[];
  upvotes: number;
  downvotes: number;
  tags: string[];
}

export interface Reply {
  id: string;
  discussionId: string;
  author: string;
  content: string;
  timestamp: number;
  parentId?: string;
  upvotes: number;
  downvotes: number;
}

export interface DAOMetrics {
  totalProposals: number;
  activeProposals: number;
  totalVotes: number;
  totalVoters: number;
  averageParticipation: number;
  treasuryValue: string;
  tokenHolders: number;
  quorumRate: number;
}

export interface UserProfile {
  address: string;
  ens?: string;
  avatar?: string;
  votingPower: string;
  proposalsCreated: number;
  votesCount: number;
  delegationsCount: number;
  reputation: number;
  joinedAt: number;
}

export interface NotificationSettings {
  proposalCreated: boolean;
  votingStarted: boolean;
  votingEnding: boolean;
  proposalPassed: boolean;
  newDiscussion: boolean;
  mentionsAndReplies: boolean;
}

export interface ProposalDraft {
  title: string;
  description: string;
  type: ProposalType;
  actions: ProposalAction[];
  votingPeriod: number;
  quorum: string;
  threshold: string;
}
