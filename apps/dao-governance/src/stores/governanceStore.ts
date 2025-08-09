import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { mockGovernanceToken, mockProposals, mockVotes } from '@/lib/mock-data';
import type {
  Delegation,
  GovernanceToken,
  Proposal,
  ProposalDraft,
  ProposalStatus,
  Vote,
  VoteSupport,
  VotingPower,
} from '@/types';

interface GovernanceState {
  // Data
  proposals: Proposal[];
  votes: Vote[];
  votingPower: VotingPower | null;
  delegations: Delegation[];
  governanceToken: GovernanceToken | null;

  // UI State
  selectedProposal: Proposal | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadProposals: () => Promise<void>;
  loadProposal: (id: string) => Promise<void>;
  createProposal: (draft: ProposalDraft) => Promise<string>;
  vote: (proposalId: string, support: VoteSupport, reason?: string) => Promise<void>;
  delegate: (delegatee: string, amount: string) => Promise<void>;
  loadVotingPower: (address: string) => Promise<void>;
  loadVotes: (proposalId: string) => Promise<void>;

  // Filters
  statusFilter: ProposalStatus | 'all';
  setStatusFilter: (status: ProposalStatus | 'all') => void;

  // Utils
  setSelectedProposal: (proposal: Proposal | null) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useGovernanceStore = create<GovernanceState>()(
  devtools(
    (set, get) => ({
      // Initial state
      proposals: [],
      votes: [],
      votingPower: null,
      delegations: [],
      governanceToken: null,
      selectedProposal: null,
      isLoading: false,
      error: null,
      statusFilter: 'all',

      // Actions
      loadProposals: async () => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const { statusFilter } = get();
          let filteredProposals = mockProposals;

          if (statusFilter !== 'all') {
            filteredProposals = mockProposals.filter((p) => p.status === statusFilter);
          }

          set({
            proposals: filteredProposals,
            governanceToken: mockGovernanceToken,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to load proposals',
            isLoading: false,
          });
        }
      },

      loadProposal: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 500));

          const proposal = mockProposals.find((p) => p.id === id);
          if (!proposal) {
            throw new Error('Proposal not found');
          }

          set({ selectedProposal: proposal, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to load proposal',
            isLoading: false,
          });
        }
      },

      createProposal: async (draft: ProposalDraft) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 2000));

          const newProposal: Proposal = {
            id: `proposal_${Date.now()}`,
            title: draft.title,
            description: draft.description,
            proposer: '0x742d35Cc6634C0532925a3b8D69deD69012e6aE9', // Mock current user
            status: 'active',
            type: draft.type,
            votingPower: '0',
            forVotes: '0',
            againstVotes: '0',
            abstainVotes: '0',
            quorum: draft.quorum,
            threshold: draft.threshold,
            startTime: Math.floor(Date.now() / 1000),
            endTime: Math.floor(Date.now() / 1000) + draft.votingPeriod,
            createdAt: Math.floor(Date.now() / 1000),
            updatedAt: Math.floor(Date.now() / 1000),
            actions: draft.actions,
          };

          set((state) => ({
            proposals: [newProposal, ...state.proposals],
            isLoading: false,
          }));

          return newProposal.id;
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to create proposal',
            isLoading: false,
          });
          throw error;
        }
      },

      vote: async (proposalId: string, support: VoteSupport, reason?: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1500));

          const newVote: Vote = {
            id: `vote_${Date.now()}`,
            proposalId,
            voter: '0x742d35Cc6634C0532925a3b8D69deD69012e6aE9', // Mock current user
            support,
            weight: '1000000000000000000000000', // 1M tokens
            reason,
            timestamp: Math.floor(Date.now() / 1000),
            transactionHash: `0x${Math.random().toString(16).substring(2)}`,
          };

          // Update votes
          set((state) => ({
            votes: [...state.votes, newVote],
          }));

          // Update proposal vote counts
          set((state) => ({
            proposals: state.proposals.map((proposal) => {
              if (proposal.id === proposalId) {
                const updatedProposal = { ...proposal };
                const voteWeight = BigInt(newVote.weight);

                switch (support) {
                  case 'for':
                    updatedProposal.forVotes = (BigInt(proposal.forVotes) + voteWeight).toString();
                    break;
                  case 'against':
                    updatedProposal.againstVotes = (
                      BigInt(proposal.againstVotes) + voteWeight
                    ).toString();
                    break;
                  case 'abstain':
                    updatedProposal.abstainVotes = (
                      BigInt(proposal.abstainVotes) + voteWeight
                    ).toString();
                    break;
                }

                return updatedProposal;
              }
              return proposal;
            }),
            isLoading: false,
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to cast vote',
            isLoading: false,
          });
          throw error;
        }
      },

      delegate: async (delegatee: string, amount: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1500));

          const newDelegation: Delegation = {
            id: `delegation_${Date.now()}`,
            delegator: '0x742d35Cc6634C0532925a3b8D69deD69012e6aE9', // Mock current user
            delegatee,
            amount,
            timestamp: Math.floor(Date.now() / 1000),
            transactionHash: `0x${Math.random().toString(16).substring(2)}`,
          };

          set((state) => ({
            delegations: [...state.delegations, newDelegation],
            isLoading: false,
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to delegate',
            isLoading: false,
          });
          throw error;
        }
      },

      loadVotingPower: async (address: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 500));

          const mockVotingPower: VotingPower = {
            address,
            balance: '5000000000000000000000000', // 5M tokens
            delegated: '1000000000000000000000000', // 1M tokens delegated out
            received: '500000000000000000000000', // 500K tokens delegated in
            votingPower: '4500000000000000000000000', // Net voting power
            blockNumber: 18000000,
          };

          set({ votingPower: mockVotingPower, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to load voting power',
            isLoading: false,
          });
        }
      },

      loadVotes: async (proposalId: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 500));

          const proposalVotes = mockVotes.filter((vote) => vote.proposalId === proposalId);
          set({ votes: proposalVotes, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to load votes',
            isLoading: false,
          });
        }
      },

      // Filters
      setStatusFilter: (status) => {
        set({ statusFilter: status });
        // Reload proposals with new filter
        get().loadProposals();
      },

      // Utils
      setSelectedProposal: (proposal) => set({ selectedProposal: proposal }),
      setError: (error) => set({ error }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'governance-store',
    }
  )
);
