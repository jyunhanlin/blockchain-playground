import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import type { HistoricalData, YieldPool, Portfolio } from '@/types';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { format } from 'date-fns';

interface YieldChartProps {
  data: HistoricalData[];
  pool?: YieldPool;
  portfolio?: Portfolio;
  type?: 'apy' | 'tvl' | 'price' | 'volume' | 'portfolio';
  height?: number;
}

export function YieldChart({
  data,

  type = 'apy',
  height = 300,
}: YieldChartProps) {
  // Color schemes
  const colors = {
    apy: '#10B981',
    tvl: '#3B82F6',
    price: '#8B5CF6',
    volume: '#F59E0B',
    portfolio: '#EF4444',
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;

      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground">{format(new Date(label), 'MMM dd, yyyy')}</p>
          <p className="font-semibold">
            {type === 'apy' && formatPercentage(value)}
            {type === 'tvl' && formatCurrency(value, 'USD', 0)}
            {type === 'price' && formatCurrency(value)}
            {type === 'volume' && formatCurrency(value, 'USD', 0)}
            {type === 'portfolio' && formatCurrency(value)}
          </p>
        </div>
      );
    }
    return null;
  };

  // Format Y-axis values
  const formatYAxis = (value: number) => {
    switch (type) {
      case 'apy':
        return `${value.toFixed(1)}%`;
      case 'tvl':
      case 'volume':
      case 'portfolio':
        return `$${(value / 1000000).toFixed(0)}M`;
      case 'price':
        return `$${value.toFixed(2)}`;
      default:
        return value.toString();
    }
  };

  const getDataKey = () => {
    switch (type) {
      case 'apy':
        return 'apy';
      case 'tvl':
        return 'tvl';
      case 'price':
        return 'price';
      case 'volume':
        return 'volume';
      case 'portfolio':
        return 'value';
      default:
        return 'apy';
    }
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      {type === 'volume' ? (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(value) => format(new Date(value), 'MM/dd')}
            stroke="#666"
            fontSize={12}
          />
          <YAxis tickFormatter={formatYAxis} stroke="#666" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey={getDataKey()} fill={colors[type]} radius={[2, 2, 0, 0]} />
        </BarChart>
      ) : (
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors[type]} stopOpacity={0.8} />
              <stop offset="95%" stopColor={colors[type]} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(value) => format(new Date(value), 'MM/dd')}
            stroke="#666"
            fontSize={12}
          />
          <YAxis tickFormatter={formatYAxis} stroke="#666" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey={getDataKey()}
            stroke={colors[type]}
            fill={`url(#gradient-${type})`}
            strokeWidth={2}
          />
        </AreaChart>
      )}
    </ResponsiveContainer>
  );
}

interface PortfolioAllocationChartProps {
  portfolio: Portfolio;
}

export function PortfolioAllocationChart({ portfolio }: PortfolioAllocationChartProps) {
  const data = portfolio.positions.map((position, index) => ({
    name: position.pool.name,
    value: position.value,
    percentage: (position.value / portfolio.totalValue) * 100,
    color: `hsl(${(index * 360) / portfolio.positions.length}, 70%, 50%)`,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm">
            {formatCurrency(data.value)} ({formatPercentage(data.percentage)})
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={120}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry) => (
            <Cell key={`cell-${entry.name}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}

interface MultiPoolComparisonProps {
  pools: YieldPool[];
  metric: 'apy' | 'tvl' | 'riskScore';
}

export function MultiPoolComparison({ pools, metric }: MultiPoolComparisonProps) {
  const data = pools.slice(0, 10).map((pool) => ({
    name: pool.name,
    protocol: pool.protocol.name,
    apy: pool.apy,
    tvl: pool.tvl,
    riskScore: pool.protocol.riskScore,
    icon: pool.protocol.icon,
  }));

  const formatValue = (value: number) => {
    switch (metric) {
      case 'apy':
        return formatPercentage(value);
      case 'tvl':
        return formatCurrency(value, 'USD', 0);
      case 'riskScore':
        return `${value.toFixed(1)}/10`;
      default:
        return value.toString();
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{label}</p>
          <p className="text-sm text-muted-foreground">{payload[0].payload.protocol}</p>
          <p className="font-semibold">{formatValue(value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        layout="horizontal"
        margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis type="number" tickFormatter={formatValue} stroke="#666" fontSize={12} />
        <YAxis type="category" dataKey="name" stroke="#666" fontSize={12} width={90} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey={metric} fill="#3B82F6" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
