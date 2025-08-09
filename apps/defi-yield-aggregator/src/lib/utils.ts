import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Big from 'big.js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | string, currency = 'USD', decimals = 2): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (Number.isNaN(num)) return '$0.00';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

export function formatNumber(amount: number | string, decimals = 2, compact = false): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (Number.isNaN(num)) return '0';

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    notation: compact ? 'compact' : 'standard',
  });

  return formatter.format(num);
}

export function formatPercentage(percentage: number | string, decimals = 2): string {
  const num = typeof percentage === 'string' ? parseFloat(percentage) : percentage;

  if (Number.isNaN(num)) return '0%';

  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num / 100);
}

export function formatTokenAmount(
  amount: number | string,
  decimals = 18,
  displayDecimals = 4
): string {
  try {
    const bigAmount = new Big(amount);
    const divisor = new Big(10).pow(decimals);
    const result = bigAmount.div(divisor);

    return result.toFixed(displayDecimals);
  } catch {
    return '0';
  }
}

export function calculateAPY(apr: number, compoundingFrequency = 365): number {
  // APY = (1 + APR/n)^n - 1
  // where n is the number of compounding periods per year
  return Math.pow(1 + apr / compoundingFrequency, compoundingFrequency) - 1;
}

export function calculateCompoundGrowth(
  principal: number,
  apy: number,
  timeInYears: number
): number {
  return principal * Math.pow(1 + apy, timeInYears);
}

export function calculateDailyRewards(principal: number, apy: number): number {
  return (principal * apy) / 365;
}

export function getRiskColor(riskLevel: string): string {
  switch (riskLevel.toLowerCase()) {
    case 'low':
      return 'text-green-600 bg-green-100';
    case 'medium':
      return 'text-yellow-600 bg-yellow-100';
    case 'high':
      return 'text-orange-600 bg-orange-100';
    case 'extreme':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

export function getApyColor(apy: number): string {
  if (apy >= 20) return 'text-green-600';
  if (apy >= 10) return 'text-blue-600';
  if (apy >= 5) return 'text-yellow-600';
  return 'text-gray-600';
}

export function truncateAddress(address: string, startLength = 6, endLength = 4): string {
  if (address.length <= startLength + endLength) return address;
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function groupBy<T, K extends keyof any>(array: T[], key: (item: T) => K): Record<K, T[]> {
  return array.reduce((groups, item) => {
    const group = key(item);
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {} as Record<K, T[]>);
}

export function sortBy<T>(
  array: T[],
  key: keyof T | ((item: T) => any),
  order: 'asc' | 'desc' = 'asc'
): T[] {
  const getValue = typeof key === 'function' ? key : (item: T) => item[key];

  return [...array].sort((a, b) => {
    const aVal = getValue(a);
    const bVal = getValue(b);

    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

export function calculateTimeRemaining(targetDate: Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
