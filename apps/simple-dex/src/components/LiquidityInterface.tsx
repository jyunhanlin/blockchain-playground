import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type Token, getTokensForChain } from '@/lib/chains';
import { cn, formatEther, parseEther } from '@/lib/utils';
import { Info, Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { TokenSelect } from './TokenSelect';

export function LiquidityInterface() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const [tokenA, setTokenA] = useState<Token | null>(null);
  const [tokenB, setTokenB] = useState<Token | null>(null);
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('add');

  const tokens = getTokensForChain(chainId);

  // Mock pool data
  const [poolData, setPoolData] = useState({
    reserve0: BigInt(1000000) * BigInt(10 ** 18),
    reserve1: BigInt(2000000) * BigInt(10 ** 6),
    totalSupply: BigInt(1414213) * BigInt(10 ** 18),
    userLiquidity: BigInt(10000) * BigInt(10 ** 18),
  });

  useEffect(() => {
    if (tokens.length >= 2 && !tokenA && !tokenB) {
      setTokenA(tokens[0]);
      setTokenB(tokens[1]);
    }
  }, [tokens, tokenA, tokenB]);

  useEffect(() => {
    if (activeTab === 'add' && amountA && tokenA && tokenB && Number.parseFloat(amountA) > 0) {
      calculateAmountB();
    }
  }, [amountA, tokenA, tokenB, activeTab]);

  const calculateAmountB = () => {
    if (!amountA || !tokenA || !tokenB) return;

    try {
      // Calculate ratio based on current pool reserves
      const inputAmount = parseEther(amountA, tokenA.decimals);
      const ratio = Number(poolData.reserve1) / Number(poolData.reserve0);
      const calculatedAmountB = (Number.parseFloat(amountA) * ratio).toFixed(6);
      setAmountB(calculatedAmountB);
    } catch (error) {
      console.error('Error calculating amount B:', error);
      setAmountB('');
    }
  };

  const handleAddLiquidity = async () => {
    if (!isConnected || !tokenA || !tokenB || !amountA || !amountB) {
      return;
    }

    setIsLoading(true);
    try {
      console.log('Adding liquidity:', {
        tokenA,
        tokenB,
        amountA,
        amountB,
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setAmountA('');
      setAmountB('');
    } catch (error) {
      console.error('Add liquidity failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveLiquidity = async () => {
    if (!isConnected || !amountA) {
      return;
    }

    setIsLoading(true);
    try {
      console.log('Removing liquidity:', {
        amount: amountA,
        tokenA,
        tokenB,
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setAmountA('');
      setAmountB('');
    } catch (error) {
      console.error('Remove liquidity failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPoolShare = () => {
    if (!amountA || !tokenA || Number.parseFloat(amountA) === 0) return 0;

    try {
      const inputAmount = parseEther(amountA, tokenA.decimals);
      const newTotalSupply = poolData.totalSupply + inputAmount;
      const share = (Number(inputAmount) / Number(newTotalSupply)) * 100;
      return share;
    } catch {
      return 0;
    }
  };

  const getCurrentShare = () => {
    if (poolData.totalSupply === 0n) return 0;
    return (Number(poolData.userLiquidity) / Number(poolData.totalSupply)) * 100;
  };

  const canAdd =
    isConnected &&
    tokenA &&
    tokenB &&
    amountA &&
    amountB &&
    Number.parseFloat(amountA) > 0 &&
    Number.parseFloat(amountB) > 0;
  const canRemove = isConnected && amountA && Number.parseFloat(amountA) > 0;

  return (
    <Card className="w-full max-w-md mx-auto card-hover">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Liquidity Pool</CardTitle>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Add
            </TabsTrigger>
            <TabsTrigger value="remove" className="flex items-center gap-1">
              <Minus className="h-4 w-4" />
              Remove
            </TabsTrigger>
          </TabsList>

          <TabsContent value="add" className="space-y-4 mt-6">
            {/* Pool Information */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-1 text-sm font-medium">
                <Info className="h-3 w-3" />
                <span>Pool Information</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Reserve {tokenA?.symbol || 'A'}</span>
                  <div className="font-mono">
                    {tokenA ? formatEther(poolData.reserve0, tokenA.decimals) : '0'}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Reserve {tokenB?.symbol || 'B'}</span>
                  <div className="font-mono">
                    {tokenB ? formatEther(poolData.reserve1, tokenB.decimals) : '0'}
                  </div>
                </div>
              </div>
            </div>

            {/* Token A Input */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Token A</span>
                {tokenA && <span>Balance: 0.00 {tokenA.symbol}</span>}
              </div>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.0"
                  value={amountA}
                  onChange={(e) => setAmountA(e.target.value)}
                  className="pr-32 h-14 text-xl font-mono"
                />
                <div className="absolute right-2 top-1 bottom-1">
                  <TokenSelect tokens={tokens} selectedToken={tokenA} onTokenSelect={setTokenA} />
                </div>
              </div>
            </div>

            {/* Plus Icon */}
            <div className="flex justify-center">
              <div className="rounded-full border bg-background p-2">
                <Plus className="h-4 w-4" />
              </div>
            </div>

            {/* Token B Input */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Token B</span>
                {tokenB && <span>Balance: 0.00 {tokenB.symbol}</span>}
              </div>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.0"
                  value={amountB}
                  onChange={(e) => setAmountB(e.target.value)}
                  className="pr-32 h-14 text-xl font-mono"
                />
                <div className="absolute right-2 top-1 bottom-1">
                  <TokenSelect
                    tokens={tokens.filter((t) => t.address !== tokenA?.address)}
                    selectedToken={tokenB}
                    onTokenSelect={setTokenB}
                  />
                </div>
              </div>
            </div>

            {/* Pool Share */}
            {canAdd && (
              <div className="bg-primary/10 rounded-lg p-3 text-sm">
                <div className="flex justify-between">
                  <span>Pool Share</span>
                  <span className="font-medium">{getPoolShare().toFixed(4)}%</span>
                </div>
              </div>
            )}

            <Button
              onClick={handleAddLiquidity}
              disabled={!canAdd || isLoading}
              className="w-full h-12 text-lg font-semibold"
            >
              {!isConnected ? 'Connect Wallet' : isLoading ? 'Adding...' : 'Add Liquidity'}
            </Button>
          </TabsContent>

          <TabsContent value="remove" className="space-y-4 mt-6">
            {/* Current Position */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-1 text-sm font-medium">
                <Info className="h-3 w-3" />
                <span>Your Position</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pool Share</span>
                  <span className="font-medium">{getCurrentShare().toFixed(4)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">LP Tokens</span>
                  <span className="font-mono">{formatEther(poolData.userLiquidity)}</span>
                </div>
              </div>
            </div>

            {/* Remove Amount */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>LP Tokens to Remove</span>
                <span>Max: {formatEther(poolData.userLiquidity)}</span>
              </div>
              <Input
                type="number"
                placeholder="0.0"
                value={amountA}
                onChange={(e) => setAmountA(e.target.value)}
                className="h-14 text-xl font-mono"
              />
            </div>

            {/* Quick Percentages */}
            <div className="grid grid-cols-4 gap-2">
              {[25, 50, 75, 100].map((percentage) => (
                <Button
                  key={percentage}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const amount = (
                      (Number(formatEther(poolData.userLiquidity)) * percentage) /
                      100
                    ).toString();
                    setAmountA(amount);
                  }}
                  className="text-xs"
                >
                  {percentage}%
                </Button>
              ))}
            </div>

            <Button
              onClick={handleRemoveLiquidity}
              disabled={!canRemove || isLoading}
              variant="destructive"
              className="w-full h-12 text-lg font-semibold"
            >
              {!isConnected ? 'Connect Wallet' : isLoading ? 'Removing...' : 'Remove Liquidity'}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
