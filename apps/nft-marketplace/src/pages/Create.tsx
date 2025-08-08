import { useState } from 'react';
import { CreateNFT } from '@/components/nft/CreateNFT';
import type { CreateNFTFormData } from '@/components/nft/CreateNFT';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle } from 'lucide-react';

export function Create() {
  const { isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleMintNFT = async (nftData: CreateNFTFormData) => {
    setIsLoading(true);
    try {
      // Simulate minting process
      console.log('Minting NFT:', nftData);

      // Here you would:
      // 1. Upload image to IPFS
      // 2. Create metadata JSON
      // 3. Upload metadata to IPFS
      // 4. Call smart contract to mint NFT

      await new Promise((resolve) => setTimeout(resolve, 3000));

      setSuccess(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error minting NFT:', error);
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              Wallet Not Connected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              You need to connect your wallet to create and mint NFTs.
            </p>
            <Button>Connect Wallet</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              NFT Created Successfully!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Your NFT has been successfully minted and is now available on the marketplace.
            </p>
            <div className="flex gap-2">
              <Button onClick={() => setSuccess(false)}>Create Another</Button>
              <Button variant="outline">View NFT</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Create New NFT</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Turn your digital art into an NFT and list it on our marketplace. Your creativity deserves
          to be recognized and rewarded.
        </p>
      </div>

      <CreateNFT onMint={handleMintNFT} isLoading={isLoading} />

      {/* Guidelines */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>NFT Creation Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">File Requirements:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Supported formats: JPG, PNG, GIF, SVG, MP4</li>
              <li>• Maximum file size: 10MB</li>
              <li>• Recommended resolution: 1080x1080px or higher</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">Best Practices:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use clear, descriptive names for your NFTs</li>
              <li>• Write detailed descriptions to help buyers understand your art</li>
              <li>• Add relevant attributes to increase discoverability</li>
              <li>• Price your NFTs fairly based on market trends</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">Minting Process:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Your image will be uploaded to IPFS for decentralized storage</li>
              <li>• Metadata will be created and stored on IPFS</li>
              <li>• Your NFT will be minted on the blockchain</li>
              <li>• Gas fees will apply for the minting transaction</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
