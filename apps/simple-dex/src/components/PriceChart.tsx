import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface PriceData {
  timestamp: number;
  price: number;
  volume: number;
}

interface PriceChartProps {
  fromSymbol?: string;
  toSymbol?: string;
}

export function PriceChart({ fromSymbol = 'ETH', toSymbol = 'USDT' }: PriceChartProps) {
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [timeframe, setTimeframe] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Generate mock price data
  const generateMockData = useCallback((timeframe: string) => {
    const now = Date.now();
    const intervals = {
      '1h': { points: 60, interval: 60 * 1000 },
      '24h': { points: 24, interval: 60 * 60 * 1000 },
      '7d': { points: 7, interval: 24 * 60 * 60 * 1000 },
      '30d': { points: 30, interval: 24 * 60 * 60 * 1000 },
    };

    const { points, interval } = intervals[timeframe as keyof typeof intervals];
    const basePrice = 2000 + Math.random() * 1000;

    const data: PriceData[] = [];
    let price = basePrice;

    for (let i = points; i >= 0; i--) {
      const timestamp = now - i * interval;
      const volatility = 0.02; // 2% volatility
      const change = (Math.random() - 0.5) * volatility;
      price = price * (1 + change);

      data.push({
        timestamp,
        price: Number(price.toFixed(2)),
        volume: Math.random() * 1000000,
      });
    }

    return data;
  }, []);

  useEffect(() => {
    setIsLoading(true);

    // Simulate API call delay
    const timer = setTimeout(() => {
      const data = generateMockData(timeframe);
      setPriceData(data);

      if (data.length > 0) {
        const latest = data[data.length - 1];
        const previous = data[0];
        setCurrentPrice(latest.price);
        setPriceChange(((latest.price - previous.price) / previous.price) * 100);
      }

      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [timeframe, generateMockData]);

  // Real-time price updates (mock)
  useEffect(() => {
    const interval = setInterval(() => {
      if (priceData.length > 0) {
        const lastPrice = currentPrice;
        const volatility = 0.001; // 0.1% volatility for real-time updates
        const change = (Math.random() - 0.5) * volatility;
        const newPrice = lastPrice * (1 + change);

        setCurrentPrice(Number(newPrice.toFixed(2)));

        // Update the last data point
        setPriceData((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            price: Number(newPrice.toFixed(2)),
          };
          return updated;
        });
      }
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [currentPrice, priceData.length]);

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(2)}K`;
    }
    return `$${price.toFixed(2)}`;
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    switch (timeframe) {
      case '1h':
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case '24h':
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case '7d':
        return date.toLocaleDateString([], { weekday: 'short' });
      case '30d':
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      default:
        return date.toLocaleDateString();
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>
              {fromSymbol}/{toSymbol} Price
            </span>
            <div className="animate-pulse bg-muted h-6 w-20 rounded" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading chart...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {fromSymbol}/{toSymbol} Price
          </CardTitle>
          <div className="flex gap-1">
            {(['1h', '24h', '7d', '30d'] as const).map((tf) => (
              <Button
                key={tf}
                variant={timeframe === tf ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeframe(tf)}
                className="text-xs"
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold">${currentPrice.toLocaleString()}</div>
          <div
            className={cn(
              'flex items-center gap-1 text-sm font-medium',
              priceChange >= 0 ? 'text-green-600' : 'text-red-600'
            )}
          >
            {priceChange >= 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {Math.abs(priceChange).toFixed(2)}%
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatTimestamp}
                axisLine={false}
                tickLine={false}
                className="text-xs"
              />
              <YAxis
                tickFormatter={formatPrice}
                axisLine={false}
                tickLine={false}
                className="text-xs"
                domain={['dataMin * 0.999', 'dataMax * 1.001']}
              />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
                labelFormatter={(timestamp: number) => new Date(timestamp).toLocaleString()}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={priceChange >= 0 ? '#22c55e' : '#ef4444'}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
