export interface NFT {
  id: string;
  tokenId: string;
  contractAddress: string;
  name: string;
  description: string;
  image: string;
  imageIpfs?: string;
  owner: string;
  creator: string;
  price?: string;
  isForSale: boolean;
  isAuction: boolean;
  auctionEndTime?: Date;
  attributes?: NFTAttribute[];
  metadata?: NFTMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface NFTAttribute {
  trait_type: string;
  value: string | number;
  display_type?: string;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: NFTAttribute[];
  external_url?: string;
  animation_url?: string;
  background_color?: string;
}

export interface User {
  address: string;
  name?: string;
  bio?: string;
  profileImage?: string;
  coverImage?: string;
  isVerified: boolean;
  socialLinks?: {
    twitter?: string;
    discord?: string;
    website?: string;
  };
  createdNFTs: NFT[];
  ownedNFTs: NFT[];
  joinedAt: Date;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  symbol: string;
  contractAddress: string;
  creator: string;
  bannerImage?: string;
  logoImage?: string;
  floorPrice?: string;
  totalVolume?: string;
  totalSupply: number;
  isVerified: boolean;
  nfts: NFT[];
  createdAt: Date;
}

export interface Sale {
  id: string;
  nftId: string;
  seller: string;
  buyer: string;
  price: string;
  transactionHash: string;
  timestamp: Date;
}

export interface Auction {
  id: string;
  nftId: string;
  seller: string;
  startingPrice: string;
  currentBid?: string;
  highestBidder?: string;
  endTime: Date;
  isActive: boolean;
  bids: Bid[];
}

export interface Bid {
  id: string;
  auctionId: string;
  bidder: string;
  amount: string;
  transactionHash: string;
  timestamp: Date;
}
