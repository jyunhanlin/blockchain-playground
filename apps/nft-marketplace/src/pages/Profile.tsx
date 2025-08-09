import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@blockchain-playground/ui';
import { Check, Copy, Edit, ExternalLink, Globe, Twitter } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { NFTGallery } from '@/components/nft/NFTGallery';
import { formatAddress } from '@/lib/utils';
import type { NFT, User } from '@/types';

// Mock user data
const mockUser: User = {
  address: '0x742d35Cc6734FfC7C2c10b0c7C0f5e6D4aB7b2f3',
  name: 'Alex Johnson',
  bio: 'Digital artist passionate about creating unique NFTs that blend traditional art with modern technology.',
  profileImage:
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face',
  coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=200&fit=crop',
  isVerified: true,
  socialLinks: {
    twitter: 'alexjohnson_art',
    website: 'https://alexjohnson.art',
  },
  createdNFTs: [],
  ownedNFTs: [],
  joinedAt: new Date('2023-06-15'),
};

// Mock NFTs for demonstration
const mockCreatedNFTs: NFT[] = [
  {
    id: '1',
    tokenId: '1',
    contractAddress: '0x123...',
    name: 'Cosmic Journey #001',
    description: 'A beautiful cosmic landscape with vibrant colors and mystical elements.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    owner: '0x742d35Cc6734FfC7C2c10b0c7C0f5e6D4aB7b2f3',
    creator: '0x742d35Cc6734FfC7C2c10b0c7C0f5e6D4aB7b2f3',
    price: '0.5',
    isForSale: true,
    isAuction: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '3',
    tokenId: '3',
    contractAddress: '0x123...',
    name: "Nature's Symphony",
    description: 'A harmonious blend of natural elements and digital artistry.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
    owner: '0x742d35Cc6734FfC7C2c10b0c7C0f5e6D4aB7b2f3',
    creator: '0x742d35Cc6734FfC7C2c10b0c7C0f5e6D4aB7b2f3',
    price: '0.8',
    isForSale: false,
    isAuction: false,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
  },
];

const mockOwnedNFTs: NFT[] = [
  {
    id: '2',
    tokenId: '2',
    contractAddress: '0x123...',
    name: 'Digital Dreams #042',
    description: 'An abstract digital art piece representing the dreams of the future.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
    owner: '0x742d35Cc6734FfC7C2c10b0c7C0f5e6D4aB7b2f3',
    creator: '0x8f9e2d1c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e',
    price: '1.2',
    isForSale: false,
    isAuction: false,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '4',
    tokenId: '4',
    contractAddress: '0x123...',
    name: 'Urban Pulse',
    description: 'Capturing the energy and rhythm of city life in digital form.',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=400&h=400&fit=crop',
    owner: '0x742d35Cc6734FfC7C2c10b0c7C0f5e6D4aB7b2f3',
    creator: '0x9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b',
    price: '2.1',
    isForSale: false,
    isAuction: false,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
  },
];

export function Profile() {
  const { address } = useAccount();
  const [copied, setCopied] = useState(false);

  const user = mockUser;
  const createdNFTs = mockCreatedNFTs;
  const ownedNFTs = mockOwnedNFTs;

  const stats = useMemo(
    () => ({
      created: createdNFTs.length,
      owned: ownedNFTs.length,
      forSale: [...createdNFTs, ...ownedNFTs].filter((nft) => nft.isForSale).length,
      totalValue: [...createdNFTs, ...ownedNFTs]
        .filter((nft) => nft.price)
        .reduce((sum, nft) => sum + Number(nft.price), 0)
        .toFixed(2),
    }),
    [createdNFTs, ownedNFTs]
  );

  const copyAddress = async () => {
    if (user.address) {
      await navigator.clipboard.writeText(user.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isOwnProfile = address && user.address.toLowerCase() === address.toLowerCase();

  return (
    <div className="space-y-6">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
        <img src={user.coverImage} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Profile Header */}
      <div className="relative -mt-16 md:-mt-20">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-4 px-4">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={user.profileImage}
              alt={user.name || 'Profile'}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-background object-cover"
            />
            {user.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold">
                {user.name || formatAddress(user.address)}
              </h1>
              {isOwnProfile && (
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              )}
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
              <span className="text-muted-foreground">{formatAddress(user.address)}</span>
              <Button variant="ghost" size="sm" onClick={copyAddress} className="h-6 w-6 p-0">
                {copied ? (
                  <Check className="h-3 w-3 text-green-500" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </div>

            {user.bio && <p className="text-muted-foreground mt-2 max-w-2xl">{user.bio}</p>}

            {/* Social Links */}
            {user.socialLinks && (
              <div className="flex items-center justify-center md:justify-start gap-4 mt-3">
                {user.socialLinks.twitter && (
                  <a
                    href={`https://twitter.com/${user.socialLinks.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {user.socialLinks.website && (
                  <a
                    href={user.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                )}
                <a
                  href={`https://etherscan.io/address/${user.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Created</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.created}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Owned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.owned}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">For Sale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.forSale}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalValue} ETH</div>
          </CardContent>
        </Card>
      </div>

      {/* NFT Tabs */}
      <Tabs defaultValue="created" className="space-y-4">
        <TabsList>
          <TabsTrigger value="created">Created ({stats.created})</TabsTrigger>
          <TabsTrigger value="owned">Owned ({stats.owned})</TabsTrigger>
        </TabsList>

        <TabsContent value="created">
          <NFTGallery nfts={createdNFTs} title="Created NFTs" showFilters={true} />
        </TabsContent>

        <TabsContent value="owned">
          <NFTGallery nfts={ownedNFTs} title="Owned NFTs" showFilters={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
