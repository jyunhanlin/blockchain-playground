import { NFTGallery } from '@/components/nft/NFTGallery';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@blockchain-playground/ui';
import { TrendingUp, Users, Palette, ShoppingBag } from 'lucide-react';
import type { NFT } from '@/types';

// Mock data for demonstration
const mockNFTs: NFT[] = [
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
    id: '2',
    tokenId: '2',
    contractAddress: '0x123...',
    name: 'Digital Dreams #042',
    description: 'An abstract digital art piece representing the dreams of the future.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
    owner: '0x8f9e2d1c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e',
    creator: '0x8f9e2d1c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e',
    price: '1.2',
    isForSale: true,
    isAuction: true,
    auctionEndTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    tokenId: '3',
    contractAddress: '0x123...',
    name: "Nature's Symphony",
    description: 'A harmonious blend of natural elements and digital artistry.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
    owner: '0x5a4b3c2d1e9f8g7h6i5j4k3l2m1n0o9p8q7r6s5t',
    creator: '0x5a4b3c2d1e9f8g7h6i5j4k3l2m1n0o9p8q7r6s5t',
    price: '0.8',
    isForSale: false,
    isAuction: false,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
  },
  {
    id: '4',
    tokenId: '4',
    contractAddress: '0x123...',
    name: 'Urban Pulse',
    description: 'Capturing the energy and rhythm of city life in digital form.',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=400&h=400&fit=crop',
    owner: '0x9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b',
    creator: '0x9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b',
    price: '2.1',
    isForSale: true,
    isAuction: false,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
  },
];

const stats = [
  {
    title: 'Total Volume',
    value: '1,247.8 ETH',
    icon: TrendingUp,
    change: '+12.5%',
  },
  {
    title: 'Active Users',
    value: '15,423',
    icon: Users,
    change: '+8.2%',
  },
  {
    title: 'NFTs Created',
    value: '89,432',
    icon: Palette,
    change: '+23.1%',
  },
  {
    title: 'Total Sales',
    value: '45,678',
    icon: ShoppingBag,
    change: '+15.7%',
  },
];

export function Home() {
  const handleBuyNFT = (nft: NFT) => {
    console.log('Buying NFT:', nft.name);
    // Implement buy logic here
  };

  const handleLikeNFT = (nft: NFT) => {
    console.log('Liked NFT:', nft.name);
    // Implement like logic here
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg p-8 md:p-12">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Digital Art</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            Collect, sell, and discover exclusive NFTs from artists around the world. Join the
            future of digital ownership.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" variant="secondary">
              Explore NFTs
            </Button>
            <Button size="lg" variant="outline">
              Create NFT
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/20 rounded-lg" />
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={`stat-${stat.title}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Featured NFTs */}
      <section>
        <NFTGallery
          nfts={mockNFTs}
          onBuyNFT={handleBuyNFT}
          onLikeNFT={handleLikeNFT}
          title="Featured NFTs"
          showFilters={true}
        />
      </section>

      {/* Call to Action */}
      <section className="bg-muted rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join thousands of artists and collectors in the world's leading NFT marketplace. Create,
          discover, and trade unique digital assets.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </section>
    </div>
  );
}
