import type {
  DAOMetrics,
  Discussion,
  GovernanceToken,
  Proposal,
  Reply,
  UserProfile,
  Vote,
} from '@/types';

export const mockGovernanceToken: GovernanceToken = {
  address: '0x4F9254C83EB525f9FCf346490bbb3ed28a81C667',
  symbol: 'GOV',
  name: 'Governance Token',
  decimals: 18,
  totalSupply: '100000000000000000000000000', // 100M tokens
};

export const mockProposals: Proposal[] = [
  {
    id: 'proposal_1',
    title: 'Increase Treasury Allocation for Developer Grants',
    description: `# Proposal: Increase Treasury Allocation for Developer Grants

## Summary
This proposal seeks to allocate an additional 2 million GOV tokens from the treasury to fund developer grants and ecosystem development.

## Motivation
The current developer grant program has been highly successful, with over 50 projects funded in the last quarter. However, demand significantly exceeds available funding.

## Specification
- Allocate 2,000,000 GOV tokens to the developer grant program
- Establish clear criteria for grant evaluation
- Create a dedicated committee to oversee grant distribution

## Implementation
The implementation will require:
1. Transfer of funds from main treasury
2. Setup of new multi-sig wallet for grant management
3. Publication of grant guidelines

## Timeline
- Phase 1: Fund transfer (Week 1)
- Phase 2: Committee formation (Week 2-3)
- Phase 3: Guidelines publication (Week 4)
- Phase 4: First grant round opening (Week 5)`,
    proposer: '0x742d35Cc6634C0532925a3b8D69deD69012e6aE9',
    status: 'active',
    type: 'treasury',
    votingPower: '45000000000000000000000000',
    forVotes: '15000000000000000000000000',
    againstVotes: '5000000000000000000000000',
    abstainVotes: '2000000000000000000000000',
    quorum: '10000000000000000000000000',
    threshold: '51',
    startTime: Math.floor(Date.now() / 1000) - 86400,
    endTime: Math.floor(Date.now() / 1000) + 86400 * 6,
    createdAt: Math.floor(Date.now() / 1000) - 86400,
    updatedAt: Math.floor(Date.now() / 1000),
    actions: [
      {
        target: '0x408ED6354d4973f66138C91495F2f2FCbd8724C3',
        value: '0',
        calldata:
          '0xa9059cbb000000000000000000000000742d35cc6634c0532925a3b8d69ded69012e6ae9000000000000000000000000000000000000000000000000000000000000000a',
        signature: 'transfer(address,uint256)',
        description: 'Transfer 2M GOV tokens to grant program wallet',
      },
    ],
  },
  {
    id: 'proposal_2',
    title: 'Upgrade Protocol to V2',
    description: `# Proposal: Upgrade Protocol to V2

## Summary
Upgrade the core protocol smart contracts to version 2.0 with enhanced security features and gas optimizations.

## Key Improvements
- 30% reduction in gas costs
- Enhanced security with reentrancy guards
- Improved user experience with batched operations
- New governance features

## Technical Details
The upgrade involves deploying new contract implementations and updating proxy contracts to point to the new logic.

## Risks
- Smart contract risk during upgrade process
- Temporary service interruption (estimated 2-4 hours)
- Need for frontend updates

## Security Audit
The new contracts have been audited by ConsenSys Diligence and Quantstamp with no critical issues found.`,
    proposer: '0x8ba1f109551bD432803012645Hac136c9c0b318',
    status: 'succeeded',
    type: 'technical',
    votingPower: '50000000000000000000000000',
    forVotes: '35000000000000000000000000',
    againstVotes: '8000000000000000000000000',
    abstainVotes: '3000000000000000000000000',
    quorum: '10000000000000000000000000',
    threshold: '67',
    startTime: Math.floor(Date.now() / 1000) - 86400 * 10,
    endTime: Math.floor(Date.now() / 1000) - 86400 * 3,
    createdAt: Math.floor(Date.now() / 1000) - 86400 * 10,
    updatedAt: Math.floor(Date.now() / 1000) - 86400 * 3,
  },
  {
    id: 'proposal_3',
    title: 'Community Marketing Initiative',
    description: `# Proposal: Community Marketing Initiative

## Summary
Launch a comprehensive marketing campaign to increase protocol adoption and community engagement.

## Proposed Activities
1. **Influencer partnerships** - Partner with key DeFi influencers
2. **Content creation** - Educational content about governance
3. **Event sponsorships** - Sponsor major DeFi conferences
4. **Bug bounty program** - Increase bug bounty rewards

## Budget Breakdown
- Influencer partnerships: $150,000
- Content creation: $50,000
- Event sponsorships: $100,000
- Bug bounty increase: $200,000
- **Total**: $500,000 equivalent in GOV tokens

## Expected Outcomes
- 50% increase in active users
- 30% increase in governance participation
- Enhanced security through bug bounty program
- Improved brand recognition in DeFi space`,
    proposer: '0x123456789abcdef123456789abcdef1234567890',
    status: 'defeated',
    type: 'social',
    votingPower: '40000000000000000000000000',
    forVotes: '12000000000000000000000000',
    againstVotes: '25000000000000000000000000',
    abstainVotes: '1000000000000000000000000',
    quorum: '10000000000000000000000000',
    threshold: '51',
    startTime: Math.floor(Date.now() / 1000) - 86400 * 15,
    endTime: Math.floor(Date.now() / 1000) - 86400 * 8,
    createdAt: Math.floor(Date.now() / 1000) - 86400 * 15,
    updatedAt: Math.floor(Date.now() / 1000) - 86400 * 8,
  },
];

export const mockVotes: Vote[] = [
  {
    id: 'vote_1',
    proposalId: 'proposal_1',
    voter: '0x742d35Cc6634C0532925a3b8D69deD69012e6aE9',
    support: 'for',
    weight: '1000000000000000000000000',
    reason:
      'This proposal will significantly boost ecosystem development and attract more builders to our platform.',
    timestamp: Math.floor(Date.now() / 1000) - 3600,
    transactionHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  },
  {
    id: 'vote_2',
    proposalId: 'proposal_1',
    voter: '0x8ba1f109551bD432803012645Hac136c9c0b318',
    support: 'against',
    weight: '500000000000000000000000',
    reason:
      'While I support developer grants, I believe the amount is too large without proper oversight mechanisms.',
    timestamp: Math.floor(Date.now() / 1000) - 7200,
    transactionHash: '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
  },
];

export const mockDiscussions: Discussion[] = [
  {
    id: 'discussion_1',
    proposalId: 'proposal_1',
    author: '0x742d35Cc6634C0532925a3b8D69deD69012e6aE9',
    title: 'Developer Grant Allocation Concerns',
    content: `I have some concerns about the proposed allocation structure. While I support increasing funding for developers, I think we need clearer metrics for success measurement.

Has the team considered implementing milestone-based releases instead of lump sum grants? This could help ensure better fund utilization and project completion rates.

Would love to hear thoughts from other community members.`,
    timestamp: Math.floor(Date.now() / 1000) - 14400,
    replies: [],
    upvotes: 15,
    downvotes: 2,
    tags: ['grants', 'treasury', 'discussion'],
  },
  {
    id: 'discussion_2',
    author: '0x8ba1f109551bD432803012645Hac136c9c0b318',
    title: 'Protocol V2 Technical Deep Dive',
    content: `I've been reviewing the technical specifications for the V2 upgrade and wanted to share some observations:

**Gas Optimizations:**
- The new batch operation system looks promising
- Storage packing improvements are well thought out
- Function selector optimization could save additional gas

**Security Enhancements:**
- ReentrancyGuard implementation is solid
- Access control patterns follow best practices
- Emergency pause mechanism is well designed

Overall, the upgrade looks technically sound. The audit reports from ConsenSys and Quantstamp give me confidence in the security aspects.`,
    timestamp: Math.floor(Date.now() / 1000) - 86400,
    replies: [],
    upvotes: 28,
    downvotes: 0,
    tags: ['technical', 'upgrade', 'security'],
  },
];

export const mockReplies: Reply[] = [
  {
    id: 'reply_1',
    discussionId: 'discussion_1',
    author: '0x987654321fedcba987654321fedcba9876543210',
    content:
      'Great points! Milestone-based releases would definitely help with accountability. We should also consider requiring monthly progress reports from grant recipients.',
    timestamp: Math.floor(Date.now() / 1000) - 10800,
    upvotes: 8,
    downvotes: 0,
  },
  {
    id: 'reply_2',
    discussionId: 'discussion_1',
    author: '0x123456789abcdef123456789abcdef1234567890',
    content:
      'I agree with the milestone approach, but we should be careful not to make the process too bureaucratic. Finding the right balance is key.',
    timestamp: Math.floor(Date.now() / 1000) - 7200,
    upvotes: 5,
    downvotes: 1,
  },
];

export const mockDAOMetrics: DAOMetrics = {
  totalProposals: 127,
  activeProposals: 3,
  totalVotes: 8247,
  totalVoters: 1432,
  averageParticipation: 23.7,
  treasuryValue: '15750000000000000000000000', // 15.75M tokens
  tokenHolders: 12847,
  quorumRate: 78.3,
};

export const mockUserProfile: UserProfile = {
  address: '0x742d35Cc6634C0532925a3b8D69deD69012e6aE9',
  ens: 'alice.eth',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
  votingPower: '1000000000000000000000000',
  proposalsCreated: 5,
  votesCount: 23,
  delegationsCount: 2,
  reputation: 847,
  joinedAt: Math.floor(Date.now() / 1000) - 86400 * 90,
};
