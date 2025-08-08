import type { NFT } from '@/types';
import { NFTCard } from './NFTCard';
import { useState, useMemo } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Grid, List } from 'lucide-react';

interface NFTGalleryProps {
  nfts: NFT[];
  onBuyNFT?: (nft: NFT) => void;
  onLikeNFT?: (nft: NFT) => void;
  title?: string;
  showFilters?: boolean;
}

type SortOption = 'newest' | 'oldest' | 'price-high' | 'price-low' | 'name';
type FilterOption = 'all' | 'for-sale' | 'auction' | 'not-for-sale';

export function NFTGallery({
  nfts,
  onBuyNFT,
  onLikeNFT,
  title = 'NFT Gallery',
  showFilters = true,
}: NFTGalleryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAndSortedNFTs = useMemo(() => {
    let filtered = nfts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (nft) =>
          nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          nft.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          nft.creator.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterBy !== 'all') {
      filtered = filtered.filter((nft) => {
        switch (filterBy) {
          case 'for-sale':
            return nft.isForSale && !nft.isAuction;
          case 'auction':
            return nft.isAuction;
          case 'not-for-sale':
            return !nft.isForSale && !nft.isAuction;
          default:
            return true;
        }
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'price-high':
          return Number(b.price || 0) - Number(a.price || 0);
        case 'price-low':
          return Number(a.price || 0) - Number(b.price || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [nfts, searchTerm, sortBy, filterBy]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search NFTs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={filterBy} onValueChange={(value: FilterOption) => setFilterBy(value)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All NFTs</SelectItem>
              <SelectItem value="for-sale">For Sale</SelectItem>
              <SelectItem value="auction">Auction</SelectItem>
              <SelectItem value="not-for-sale">Not for Sale</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredAndSortedNFTs.length} of {nfts.length} NFTs
      </div>

      {/* NFT Grid/List */}
      {filteredAndSortedNFTs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No NFTs found</p>
          <p className="text-sm text-muted-foreground mt-2">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }
        >
          {filteredAndSortedNFTs.map((nft) => (
            <NFTCard key={nft.id} nft={nft} onBuy={onBuyNFT} onLike={onLikeNFT} />
          ))}
        </div>
      )}
    </div>
  );
}
