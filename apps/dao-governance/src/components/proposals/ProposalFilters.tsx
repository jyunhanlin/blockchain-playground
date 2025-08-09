import { Button, Input, Select } from '@blockchain-playground/ui';
import { Filter, RotateCcw, Search } from 'lucide-react';
import { useState } from 'react';
import type { ProposalStatus, ProposalType } from '@/types';

interface ProposalFiltersProps {
  statusFilter: ProposalStatus | 'all';
  onStatusFilterChange: (status: ProposalStatus | 'all') => void;
  onSearchChange: (search: string) => void;
  onTypeFilterChange: (type: ProposalType | 'all') => void;
  onReset: () => void;
}

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'succeeded', label: 'Succeeded' },
  { value: 'defeated', label: 'Defeated' },
  { value: 'queued', label: 'Queued' },
  { value: 'executed', label: 'Executed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'expired', label: 'Expired' },
];

const typeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'constitutional', label: 'Constitutional' },
  { value: 'treasury', label: 'Treasury' },
  { value: 'technical', label: 'Technical' },
  { value: 'social', label: 'Social' },
  { value: 'emergency', label: 'Emergency' },
];

export default function ProposalFilters({
  statusFilter,
  onStatusFilterChange,
  onSearchChange,
  onTypeFilterChange,
  onReset,
}: ProposalFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<ProposalType | 'all'>('all');

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleTypeChange = (value: ProposalType | 'all') => {
    setTypeFilter(value);
    onTypeFilterChange(value);
  };

  const handleReset = () => {
    setSearchTerm('');
    setTypeFilter('all');
    onStatusFilterChange('all');
    onSearchChange('');
    onTypeFilterChange('all');
    onReset();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-medium">Filter Proposals</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search proposals..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <option value="" disabled>
            Select status
          </option>
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        {/* Type Filter */}
        <Select value={typeFilter} onValueChange={handleTypeChange}>
          <option value="" disabled>
            Select type
          </option>
          {typeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        {/* Reset Button */}
        <Button variant="outline" onClick={handleReset} className="flex items-center space-x-2">
          <RotateCcw className="h-4 w-4" />
          <span>Reset</span>
        </Button>
      </div>

      {/* Active Filters Display */}
      <div className="flex items-center space-x-2 mt-4">
        {statusFilter !== 'all' && (
          <div className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs">
            Status: {statusOptions.find((o) => o.value === statusFilter)?.label}
          </div>
        )}
        {typeFilter !== 'all' && (
          <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs">
            Type: {typeOptions.find((o) => o.value === typeFilter)?.label}
          </div>
        )}
        {searchTerm && (
          <div className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs">
            Search: "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
}
