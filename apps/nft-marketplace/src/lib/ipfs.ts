import { create } from 'kubo-rpc-client';
import type { NFTMetadata } from '@/types';

// IPFS client configuration
const projectId = process.env.VITE_INFURA_PROJECT_ID || 'your-infura-project-id';
const projectSecret = process.env.VITE_INFURA_PROJECT_SECRET || 'your-infura-project-secret';

const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`;

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

/**
 * Upload a file to IPFS
 * @param file - The file to upload
 * @returns The IPFS hash of the uploaded file
 */
export async function uploadFileToIPFS(file: File): Promise<string> {
  try {
    const result = await ipfs.add(file);
    return result.path;
  } catch (error) {
    console.error('Error uploading file to IPFS:', error);
    throw new Error('Failed to upload file to IPFS');
  }
}

/**
 * Upload JSON metadata to IPFS
 * @param metadata - The metadata object to upload
 * @returns The IPFS hash of the uploaded metadata
 */
export async function uploadMetadataToIPFS(metadata: NFTMetadata): Promise<string> {
  try {
    const result = await ipfs.add(JSON.stringify(metadata));
    return result.path;
  } catch (error) {
    console.error('Error uploading metadata to IPFS:', error);
    throw new Error('Failed to upload metadata to IPFS');
  }
}

/**
 * Get IPFS URL for a given hash
 * @param hash - The IPFS hash
 * @returns The full IPFS URL
 */
export function getIPFSUrl(hash: string): string {
  return `https://ipfs.io/ipfs/${hash}`;
}

/**
 * Pin content to IPFS (to ensure it stays available)
 * @param hash - The IPFS hash to pin
 */
export async function pinToIPFS(hash: string): Promise<void> {
  try {
    await ipfs.pin.add(hash);
  } catch (error) {
    console.error('Error pinning to IPFS:', error);
    throw new Error('Failed to pin content to IPFS');
  }
}

/**
 * Create and upload complete NFT metadata to IPFS
 * @param name - NFT name
 * @param description - NFT description
 * @param imageFile - The image file
 * @param attributes - NFT attributes
 * @returns Object containing image hash, metadata hash, and metadata URL
 */
export async function createAndUploadNFTMetadata(
  name: string,
  description: string,
  imageFile: File,
  attributes: NFTMetadata['attributes'] = []
): Promise<{
  imageHash: string;
  metadataHash: string;
  metadataUrl: string;
  imageUrl: string;
}> {
  try {
    // Upload image to IPFS
    const imageHash = await uploadFileToIPFS(imageFile);
    const imageUrl = getIPFSUrl(imageHash);

    // Create metadata object
    const metadata: NFTMetadata = {
      name,
      description,
      image: imageUrl,
      attributes,
    };

    // Upload metadata to IPFS
    const metadataHash = await uploadMetadataToIPFS(metadata);
    const metadataUrl = getIPFSUrl(metadataHash);

    // Pin both image and metadata
    await Promise.all([pinToIPFS(imageHash), pinToIPFS(metadataHash)]);

    return {
      imageHash,
      metadataHash,
      metadataUrl,
      imageUrl,
    };
  } catch (error) {
    console.error('Error creating and uploading NFT metadata:', error);
    throw new Error('Failed to create and upload NFT metadata');
  }
}

/**
 * Fetch metadata from IPFS
 * @param hash - The IPFS hash of the metadata
 * @returns The metadata object
 */
export async function fetchMetadataFromIPFS(hash: string): Promise<NFTMetadata> {
  try {
    const response = await fetch(getIPFSUrl(hash));
    if (!response.ok) {
      throw new Error(`Failed to fetch metadata: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching metadata from IPFS:', error);
    throw new Error('Failed to fetch metadata from IPFS');
  }
}
