import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatUnits, parseUnits } from 'viem';
import type { ProposalStatus, VoteSupport } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTokenAmount(
  amount: string | bigint,
  decimals: number = 18,
  displayDecimals: number = 4
): string {
  const formatted = formatUnits(BigInt(amount), decimals);
  const num = Number.parseFloat(formatted);

  if (num === 0) return '0';
  if (num < 0.0001) return '< 0.0001';

  return num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: displayDecimals,
  });
}

export function parseTokenAmount(amount: string, decimals: number = 18): string {
  try {
    return parseUnits(amount, decimals).toString();
  } catch {
    return '0';
  }
}

export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatDuration(seconds: number): string {
  const days = Math.floor(seconds / (24 * 3600));
  const hours = Math.floor((seconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) {
    return `${days}d ${hours}h`;
  }
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

export function formatTimeRemaining(endTime: number): string {
  const now = Math.floor(Date.now() / 1000);
  const remaining = endTime - now;

  if (remaining <= 0) {
    return 'Ended';
  }

  return formatDuration(remaining);
}

export function getProposalStatusColor(status: ProposalStatus): string {
  const colors: Record<ProposalStatus, string> = {
    draft: 'text-gray-500 bg-gray-100',
    active: 'text-blue-700 bg-blue-100',
    succeeded: 'text-green-700 bg-green-100',
    defeated: 'text-red-700 bg-red-100',
    queued: 'text-yellow-700 bg-yellow-100',
    executed: 'text-purple-700 bg-purple-100',
    cancelled: 'text-gray-700 bg-gray-100',
    expired: 'text-orange-700 bg-orange-100',
  };

  return colors[status] || colors.draft;
}

export function getVoteSupportColor(support: VoteSupport): string {
  const colors: Record<VoteSupport, string> = {
    for: 'text-green-700 bg-green-100',
    against: 'text-red-700 bg-red-100',
    abstain: 'text-gray-700 bg-gray-100',
  };

  return colors[support];
}

export function calculateVotingProgress(
  forVotes: string,
  againstVotes: string,
  abstainVotes: string
) {
  const totalVotes = BigInt(forVotes) + BigInt(againstVotes) + BigInt(abstainVotes);

  if (totalVotes === 0n) {
    return { forPercentage: 0, againstPercentage: 0, abstainPercentage: 0 };
  }

  const forPercentage = Number((BigInt(forVotes) * 100n) / totalVotes);
  const againstPercentage = Number((BigInt(againstVotes) * 100n) / totalVotes);
  const abstainPercentage = Number((BigInt(abstainVotes) * 100n) / totalVotes);

  return { forPercentage, againstPercentage, abstainPercentage };
}

export function isQuorumMet(totalVotes: string, quorum: string): boolean {
  return BigInt(totalVotes) >= BigInt(quorum);
}

export function isThresholdMet(forVotes: string, againstVotes: string, threshold: string): boolean {
  const totalVotesForThreshold = BigInt(forVotes) + BigInt(againstVotes);
  if (totalVotesForThreshold === 0n) return false;

  const forPercentage = (BigInt(forVotes) * 100n) / totalVotesForThreshold;
  return forPercentage >= BigInt(threshold);
}

export function shortenAddress(address: string, chars: number = 4): string {
  if (!address) return '';
  if (address.length <= chars * 2 + 2) return address;

  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp * 1000;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function validateEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function generateProposalId(): string {
  return `proposal_${Date.now()}_${Math.random().toString(36).substring(2)}`;
}

export function generateDiscussionId(): string {
  return `discussion_${Date.now()}_${Math.random().toString(36).substring(2)}`;
}
