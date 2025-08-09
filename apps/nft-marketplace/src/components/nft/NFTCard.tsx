import { Button, Card, CardContent, CardFooter } from '@blockchain-playground/ui';
import { Clock, Heart, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { formatAddress, formatPrice } from '@/lib/utils';
import type { NFT } from '@/types';

interface NFTCardProps {
  nft: NFT;
  onBuy?: (nft: NFT) => void;
  onLike?: (nft: NFT) => void;
  showPrice?: boolean;
}

export function NFTCard({ nft, onBuy, onLike, showPrice = true }: NFTCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.(nft);
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      <div className="relative aspect-square overflow-hidden">
        {!imageLoaded && <div className="absolute inset-0 bg-muted animate-pulse" />}
        <img
          src={nft.image}
          alt={nft.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleLike}
            className={`${isLiked ? 'text-red-500' : ''}`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
          {nft.isForSale && onBuy && (
            <Button size="sm" onClick={() => onBuy(nft)}>
              <ShoppingCart className="h-4 w-4" />
              Buy Now
            </Button>
          )}
        </div>

        {/* Auction indicator */}
        {nft.isAuction && nft.auctionEndTime && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Auction
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg truncate">{nft.name}</h3>
        <p className="text-sm text-muted-foreground truncate">{nft.description}</p>

        <div className="mt-2 flex justify-between items-center text-sm text-muted-foreground">
          <span>Owner: {formatAddress(nft.owner)}</span>
          <span>Creator: {formatAddress(nft.creator)}</span>
        </div>
      </CardContent>

      {showPrice && nft.price && (
        <CardFooter className="p-4 pt-0">
          <div className="w-full flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="text-lg font-bold">{formatPrice(nft.price)}</p>
            </div>
            {nft.isForSale && onBuy && <Button onClick={() => onBuy(nft)}>Buy Now</Button>}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
