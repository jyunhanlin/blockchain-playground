import { Card, Button, Input, Label, Select } from '@blockchain-playground/ui';
import { Filter, X, Search } from 'lucide-react';
import type { FilterOptions, DeFiProtocol } from '@/types';
import { ProtocolCategory, RiskLevel, SortOption } from '@/types';
import { MultiSelect } from './MultiSelect';

interface PoolFiltersProps {
  filters: FilterOptions;
  protocols: DeFiProtocol[];
  searchQuery: string;
  onFiltersChange: (filters: Partial<FilterOptions>) => void;
  onSearchChange: (query: string) => void;
  onReset: () => void;
}

export function PoolFilters({
  filters,
  protocols,
  searchQuery,
  onFiltersChange,
  onSearchChange,
  onReset,
}: PoolFiltersProps) {
  const protocolOptions = protocols.map((protocol) => ({
    value: protocol.id,
    label: protocol.name,
  }));

  const categoryOptions = Object.values(ProtocolCategory).map((category) => ({
    value: category,
    label: category.replace('_', ' ').toUpperCase(),
  }));

  const riskOptions = Object.values(RiskLevel).map((risk) => ({
    value: risk,
    label: risk.toUpperCase(),
  }));

  const sortOptions = Object.values(SortOption).map((sort) => ({
    value: sort,
    label: sort.replace('_', ' ').toUpperCase(),
  }));

  const hasActiveFilters =
    filters.protocols.length > 0 ||
    filters.categories.length > 0 ||
    filters.riskLevels.length > 0 ||
    filters.minApy > 0 ||
    filters.maxApy < 100 ||
    filters.minTvl > 0 ||
    searchQuery.trim().length > 0;

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Filters</h3>
          </div>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={onReset} className="text-xs">
              <X className="h-3 w-3 mr-1" />
              Reset
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search Pools</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by pool name, protocol, or token..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Protocol Filter */}
        <div className="space-y-2">
          <Label>Protocols</Label>
          <MultiSelect
            options={protocolOptions}
            value={filters.protocols}
            onValueChange={(protocols) => onFiltersChange({ protocols })}
            placeholder="Select protocols..."
          />
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <Label>Categories</Label>
          <MultiSelect
            options={categoryOptions}
            value={filters.categories}
            onValueChange={(categories) =>
              onFiltersChange({ categories: categories as ProtocolCategory[] })
            }
            placeholder="Select categories..."
          />
        </div>

        {/* Risk Level Filter */}
        <div className="space-y-2">
          <Label>Risk Levels</Label>
          <MultiSelect
            options={riskOptions}
            value={filters.riskLevels}
            onValueChange={(riskLevels) =>
              onFiltersChange({ riskLevels: riskLevels as RiskLevel[] })
            }
            placeholder="Select risk levels..."
          />
        </div>

        {/* APY Range */}
        <div className="space-y-4">
          <Label>APY Range</Label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="minApy" className="text-xs text-muted-foreground">
                Min APY (%)
              </Label>
              <Input
                id="minApy"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={filters.minApy}
                onChange={(e) => onFiltersChange({ minApy: parseFloat(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="maxApy" className="text-xs text-muted-foreground">
                Max APY (%)
              </Label>
              <Input
                id="maxApy"
                type="number"
                min="0"
                max="1000"
                step="0.1"
                value={filters.maxApy}
                onChange={(e) => onFiltersChange({ maxApy: parseFloat(e.target.value) || 100 })}
                placeholder="100"
              />
            </div>
          </div>
        </div>

        {/* Minimum TVL */}
        <div className="space-y-2">
          <Label htmlFor="minTvl">Minimum TVL (USD)</Label>
          <Input
            id="minTvl"
            type="number"
            min="0"
            step="1000000"
            value={filters.minTvl}
            onChange={(e) => onFiltersChange({ minTvl: parseFloat(e.target.value) || 0 })}
            placeholder="0"
          />
        </div>

        {/* Sort Options */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Sort By</Label>
            <Select
              value={filters.sortBy}
              onValueChange={(sortBy) => onFiltersChange({ sortBy: sortBy as SortOption })}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Order</Label>
            <Select
              value={filters.sortOrder}
              onValueChange={(sortOrder) =>
                onFiltersChange({ sortOrder: sortOrder as 'asc' | 'desc' })
              }
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
}
