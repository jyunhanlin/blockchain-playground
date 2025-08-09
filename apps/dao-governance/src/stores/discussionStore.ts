import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { mockDiscussions, mockReplies } from '@/lib/mock-data';
import { generateDiscussionId } from '@/lib/utils';
import type { Discussion, Reply } from '@/types';

interface DiscussionState {
  // Data
  discussions: Discussion[];
  selectedDiscussion: Discussion | null;

  // UI State
  isLoading: boolean;
  error: string | null;

  // Filters
  searchTerm: string;
  selectedTags: string[];

  // Actions
  loadDiscussions: (proposalId?: string) => Promise<void>;
  loadDiscussion: (id: string) => Promise<void>;
  createDiscussion: (
    discussion: Omit<Discussion, 'id' | 'timestamp' | 'replies' | 'upvotes' | 'downvotes'>
  ) => Promise<string>;
  addReply: (discussionId: string, content: string, parentId?: string) => Promise<void>;
  voteOnDiscussion: (discussionId: string, isUpvote: boolean) => Promise<void>;
  voteOnReply: (replyId: string, isUpvote: boolean) => Promise<void>;

  // Filters
  setSearchTerm: (term: string) => void;
  setSelectedTags: (tags: string[]) => void;

  // Utils
  setSelectedDiscussion: (discussion: Discussion | null) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useDiscussionStore = create<DiscussionState>()(
  devtools(
    (set, get) => ({
      // Initial state
      discussions: [],
      selectedDiscussion: null,
      isLoading: false,
      error: null,
      searchTerm: '',
      selectedTags: [],

      // Actions
      loadDiscussions: async (proposalId?: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 800));

          let discussions = [...mockDiscussions];

          // Filter by proposal if specified
          if (proposalId) {
            discussions = discussions.filter((d) => d.proposalId === proposalId);
          }

          // Apply search and tag filters
          const { searchTerm, selectedTags } = get();

          if (searchTerm) {
            discussions = discussions.filter(
              (d) =>
                d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                d.content.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }

          if (selectedTags.length > 0) {
            discussions = discussions.filter((d) =>
              d.tags.some((tag) => selectedTags.includes(tag))
            );
          }

          // Add replies to discussions
          discussions = discussions.map((discussion) => ({
            ...discussion,
            replies: mockReplies.filter((reply) => reply.discussionId === discussion.id),
          }));

          set({ discussions, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to load discussions',
            isLoading: false,
          });
        }
      },

      loadDiscussion: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 500));

          const discussion = mockDiscussions.find((d) => d.id === id);
          if (!discussion) {
            throw new Error('Discussion not found');
          }

          // Add replies
          const discussionWithReplies = {
            ...discussion,
            replies: mockReplies.filter((reply) => reply.discussionId === id),
          };

          set({ selectedDiscussion: discussionWithReplies, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to load discussion',
            isLoading: false,
          });
        }
      },

      createDiscussion: async (discussionData) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1500));

          const newDiscussion: Discussion = {
            ...discussionData,
            id: generateDiscussionId(),
            timestamp: Math.floor(Date.now() / 1000),
            replies: [],
            upvotes: 0,
            downvotes: 0,
          };

          set((state) => ({
            discussions: [newDiscussion, ...state.discussions],
            isLoading: false,
          }));

          return newDiscussion.id;
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to create discussion',
            isLoading: false,
          });
          throw error;
        }
      },

      addReply: async (discussionId: string, content: string, parentId?: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const newReply: Reply = {
            id: `reply_${Date.now()}_${Math.random().toString(36).substring(2)}`,
            discussionId,
            author: '0x742d35Cc6634C0532925a3b8D69deD69012e6aE9', // Mock current user
            content,
            timestamp: Math.floor(Date.now() / 1000),
            parentId,
            upvotes: 0,
            downvotes: 0,
          };

          // Update discussions with new reply
          set((state) => ({
            discussions: state.discussions.map((discussion) => {
              if (discussion.id === discussionId) {
                return {
                  ...discussion,
                  replies: [...discussion.replies, newReply],
                };
              }
              return discussion;
            }),
            selectedDiscussion:
              state.selectedDiscussion?.id === discussionId
                ? {
                    ...state.selectedDiscussion,
                    replies: [...state.selectedDiscussion.replies, newReply],
                  }
                : state.selectedDiscussion,
            isLoading: false,
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to add reply',
            isLoading: false,
          });
          throw error;
        }
      },

      voteOnDiscussion: async (discussionId: string, isUpvote: boolean) => {
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 300));

          set((state) => ({
            discussions: state.discussions.map((discussion) => {
              if (discussion.id === discussionId) {
                return {
                  ...discussion,
                  upvotes: isUpvote ? discussion.upvotes + 1 : discussion.upvotes,
                  downvotes: !isUpvote ? discussion.downvotes + 1 : discussion.downvotes,
                };
              }
              return discussion;
            }),
            selectedDiscussion:
              state.selectedDiscussion?.id === discussionId
                ? {
                    ...state.selectedDiscussion,
                    upvotes: isUpvote
                      ? state.selectedDiscussion.upvotes + 1
                      : state.selectedDiscussion.upvotes,
                    downvotes: !isUpvote
                      ? state.selectedDiscussion.downvotes + 1
                      : state.selectedDiscussion.downvotes,
                  }
                : state.selectedDiscussion,
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to vote on discussion',
          });
          throw error;
        }
      },

      voteOnReply: async (replyId: string, isUpvote: boolean) => {
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 300));

          set((state) => ({
            discussions: state.discussions.map((discussion) => ({
              ...discussion,
              replies: discussion.replies.map((reply) => {
                if (reply.id === replyId) {
                  return {
                    ...reply,
                    upvotes: isUpvote ? reply.upvotes + 1 : reply.upvotes,
                    downvotes: !isUpvote ? reply.downvotes + 1 : reply.downvotes,
                  };
                }
                return reply;
              }),
            })),
            selectedDiscussion: state.selectedDiscussion
              ? {
                  ...state.selectedDiscussion,
                  replies: state.selectedDiscussion.replies.map((reply) => {
                    if (reply.id === replyId) {
                      return {
                        ...reply,
                        upvotes: isUpvote ? reply.upvotes + 1 : reply.upvotes,
                        downvotes: !isUpvote ? reply.downvotes + 1 : reply.downvotes,
                      };
                    }
                    return reply;
                  }),
                }
              : state.selectedDiscussion,
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to vote on reply',
          });
          throw error;
        }
      },

      // Filters
      setSearchTerm: (term) => {
        set({ searchTerm: term });
        // Reload discussions with new filter
        get().loadDiscussions();
      },

      setSelectedTags: (tags) => {
        set({ selectedTags: tags });
        // Reload discussions with new filter
        get().loadDiscussions();
      },

      // Utils
      setSelectedDiscussion: (discussion) => set({ selectedDiscussion: discussion }),
      setError: (error) => set({ error }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'discussion-store',
    }
  )
);
