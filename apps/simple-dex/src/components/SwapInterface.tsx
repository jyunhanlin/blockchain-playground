import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@blockchain-playground/ui';
import { type Token, getTokensForChain } from '@/lib/chains';
import {
  calculateOutputAmount,
  calculatePriceImpact,
  cn,
  formatEther,
  parseEther,
} from '@/lib/utils';
import { ArrowUpDown, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { PriceImpactDisplay } from './PriceImpactDisplay';
import { TokenSelect } from './TokenSelect';

export function SwapInterface() {
  const { isConnected } = useAccount();
  const chainId = useChainId();

  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage] = useState(0.5);
  const [isLoading, setIsLoading] = useState(false);

  const tokens = getTokensForChain(chainId);

  // Mock reserves for price calculation (in production, fetch from smart contracts)
  const mockReserves = {
    [fromToken?.address || '']: BigInt(1000000) * BigInt(10 ** (fromToken?.decimals || 18)),
    [toToken?.address || '']: BigInt(2000000) * BigInt(10 ** (toToken?.decimals || 18)),
  };

  useEffect(() => {
    if (tokens.length >= 2 && !fromToken && !toToken) {
      setFromToken(tokens[0]);
      setToToken(tokens[1]);
    }
  }, [tokens, fromToken, toToken]);

  useEffect(() => {
    if (fromAmount && fromToken && toToken && Number.parseFloat(fromAmount) > 0) {
      calculateToAmount();
    } else {
      setToAmount('');
    }
  }, [fromAmount, fromToken, toToken]);

  const calculateToAmount = () => {
    if (!fromAmount || !fromToken || !toToken) return;

    try {
      const inputAmount = parseEther(fromAmount, fromToken.decimals);
      const fromReserve =
        mockReserves[fromToken.address] || BigInt(1000000) * BigInt(10 ** fromToken.decimals);
      const toReserve =
        mockReserves[toToken.address] || BigInt(2000000) * BigInt(10 ** toToken.decimals);

      const outputAmount = calculateOutputAmount(inputAmount, fromReserve, toReserve);
      setToAmount(formatEther(outputAmount, toToken.decimals));
    } catch (error) {
      console.error('Error calculating output amount:', error);
      setToAmount('');
    }
  };

  const handleSwapTokens = () => {
    const tempToken = fromToken;
    const tempAmount = fromAmount;

    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleSwap = async () => {
    if (!isConnected || !fromToken || !toToken || !fromAmount) {
      return;
    }

    setIsLoading(true);
    try {
      // In production, implement actual swap logic here
      console.log('Swapping:', {
        from: fromToken,
        to: toToken,
        fromAmount,
        toAmount,
        slippage,
      });

      // Simulate transaction delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Reset form after successful swap
      setFromAmount('');
      setToAmount('');
    } catch (error) {
      console.error('Swap failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPriceImpact = () => {
    if (!fromAmount || !fromToken || !toToken || Number.parseFloat(fromAmount) === 0) {
      return 0;
    }

    try {
      const inputAmount = parseEther(fromAmount, fromToken.decimals);
      const fromReserve =
        mockReserves[fromToken.address] || BigInt(1000000) * BigInt(10 ** fromToken.decimals);
      const toReserve =
        mockReserves[toToken.address] || BigInt(2000000) * BigInt(10 ** toToken.decimals);

      return calculatePriceImpact(inputAmount, fromReserve, toReserve);
    } catch {
      return 0;
    }
  };

  const canSwap =
    isConnected && fromToken && toToken && fromAmount && Number.parseFloat(fromAmount) > 0;

  return (
    <Card className="w-full max-w-md mx-auto card-hover">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Swap Tokens</CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* From Token */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>From</span>
            {fromToken && <span>Balance: 0.00 {fromToken.symbol}</span>}
          </div>
          <div className="relative">
            <Input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="pr-32 h-16 text-2xl font-mono"
            />
            <div className="absolute right-2 top-2 bottom-2">
              <TokenSelect tokens={tokens} selectedToken={fromToken} onTokenSelect={setFromToken} />
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSwapTokens}
            className="rounded-full border bg-background hover:bg-accent"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        {/* To Token */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>To</span>
            {toToken && <span>Balance: 0.00 {toToken.symbol}</span>}
          </div>
          <div className="relative">
            <Input
              type="number"
              placeholder="0.0"
              value={toAmount}
              readOnly
              className="pr-32 h-16 text-2xl font-mono bg-muted/50"
            />
            <div className="absolute right-2 top-2 bottom-2">
              <TokenSelect
                tokens={tokens.filter((t) => t.address !== fromToken?.address)}
                selectedToken={toToken}
                onTokenSelect={setToToken}
              />
            </div>
          </div>
        </div>

        {/* Price Impact */}
        {fromAmount && toAmount && (
          <PriceImpactDisplay
            priceImpact={getPriceImpact()}
            fromToken={fromToken}
            toToken={toToken}
            fromAmount={fromAmount}
            toAmount={toAmount}
          />
        )}

        {/* Swap Button */}
        <Button
          onClick={handleSwap}
          disabled={!canSwap || isLoading}
          className={cn('w-full h-12 text-lg font-semibold', !isConnected && 'gradient-bg')}
        >
          {!isConnected ? 'Connect Wallet' : isLoading ? 'Swapping...' : 'Swap'}
        </Button>

        {/* Transaction Details */}
        {canSwap && (
          <div className="space-y-2 text-sm text-muted-foreground border-t pt-4">
            <div className="flex justify-between">
              <span>Slippage Tolerance</span>
              <span>{slippage}%</span>
            </div>
            <div className="flex justify-between">
              <span>Minimum Received</span>
              <span>
                {toAmount
                  ? (Number.parseFloat(toAmount) * (1 - slippage / 100)).toFixed(6)
                  : '0.00'}{' '}
                {toToken?.symbol}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
