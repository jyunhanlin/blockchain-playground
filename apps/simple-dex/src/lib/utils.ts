import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEther(value: bigint, decimals = 18): string {
  const divisor = BigInt(10 ** decimals);
  const quotient = value / divisor;
  const remainder = value % divisor;

  if (remainder === 0n) {
    return quotient.toString();
  }

  const remainderStr = remainder.toString().padStart(decimals, '0');
  const trimmedRemainder = remainderStr.replace(/0+$/, '');

  return `${quotient}.${trimmedRemainder}`;
}

export function parseEther(value: string, decimals = 18): bigint {
  const [integer, fraction = ''] = value.split('.');
  const fractionPadded = fraction.padEnd(decimals, '0').slice(0, decimals);
  return BigInt(integer + fractionPadded);
}

export function formatPrice(price: number, decimals = 6): string {
  return price.toFixed(decimals).replace(/\.?0+$/, '');
}

export function calculatePrice(reserve0: bigint, reserve1: bigint): number {
  if (reserve1 === 0n) return 0;
  return Number(reserve0) / Number(reserve1);
}

export function calculateOutputAmount(
  inputAmount: bigint,
  inputReserve: bigint,
  outputReserve: bigint,
  fee = 997n // 0.3% fee
): bigint {
  if (inputAmount === 0n || inputReserve === 0n || outputReserve === 0n) {
    return 0n;
  }

  const inputAmountWithFee = inputAmount * fee;
  const numerator = inputAmountWithFee * outputReserve;
  const denominator = inputReserve * 1000n + inputAmountWithFee;

  return numerator / denominator;
}

export function calculatePriceImpact(
  inputAmount: bigint,
  inputReserve: bigint,
  outputReserve: bigint
): number {
  if (inputAmount === 0n || inputReserve === 0n || outputReserve === 0n) {
    return 0;
  }

  const currentPrice = Number(outputReserve) / Number(inputReserve);
  const newInputReserve = inputReserve + inputAmount;
  const outputAmount = calculateOutputAmount(inputAmount, inputReserve, outputReserve);
  const newOutputReserve = outputReserve - outputAmount;
  const newPrice = Number(newOutputReserve) / Number(newInputReserve);

  return Math.abs((newPrice - currentPrice) / currentPrice) * 100;
}

export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
