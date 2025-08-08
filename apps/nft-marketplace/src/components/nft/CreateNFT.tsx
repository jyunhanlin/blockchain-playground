import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '@blockchain-playground/ui';
import { Label } from '@blockchain-playground/ui';
import { Upload, Plus, X } from 'lucide-react';
import type { NFTAttribute } from '@/types';

interface CreateNFTProps {
  onMint?: (nftData: CreateNFTFormData) => void;
  isLoading?: boolean;
}

export interface CreateNFTFormData {
  name: string;
  description: string;
  image: File | null;
  price?: string;
  isForSale: boolean;
  attributes: NFTAttribute[];
}

export function CreateNFT({ onMint, isLoading = false }: CreateNFTProps) {
  const [formData, setFormData] = useState<CreateNFTFormData>({
    name: '',
    description: '',
    image: null,
    price: '',
    isForSale: false,
    attributes: [],
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addAttribute = () => {
    setFormData((prev) => ({
      ...prev,
      attributes: [...prev.attributes, { trait_type: '', value: '' }],
    }));
  };

  const updateAttribute = (index: number, field: 'trait_type' | 'value', value: string) => {
    setFormData((prev) => ({
      ...prev,
      attributes: prev.attributes.map((attr, i) =>
        i === index ? { ...attr, [field]: value } : attr
      ),
    }));
  };

  const removeAttribute = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.image) return;

    onMint?.(formData);
  };

  const isFormValid = formData.name && formData.image && formData.description;

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create New NFT</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="image">Image *</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData((prev) => ({ ...prev, image: null }));
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="mt-4">
                      <Label
                        htmlFor="image"
                        className="cursor-pointer inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
                      >
                        <Upload className="h-4 w-4" />
                        Upload Image
                      </Label>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter NFT name"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Enter NFT description"
                className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md bg-transparent text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                required
              />
            </div>

            {/* Sale Options */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isForSale"
                  checked={formData.isForSale}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, isForSale: e.target.checked }))
                  }
                  className="rounded border-input"
                />
                <Label htmlFor="isForSale">Put on sale</Label>
              </div>

              {formData.isForSale && (
                <div className="space-y-2">
                  <Label htmlFor="price">Price (ETH)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.001"
                    value={formData.price}
                    onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                    placeholder="0.001"
                  />
                </div>
              )}
            </div>

            {/* Attributes */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Attributes</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addAttribute}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Attribute
                </Button>
              </div>

              {formData.attributes.map((attribute, index) => (
                <div
                  key={`attribute-${index}-${attribute.trait_type}`}
                  className="flex gap-2 items-end"
                >
                  <div className="flex-1">
                    <Label htmlFor={`trait-${index}`}>Trait Type</Label>
                    <Input
                      id={`trait-${index}`}
                      value={attribute.trait_type}
                      onChange={(e) => updateAttribute(index, 'trait_type', e.target.value)}
                      placeholder="e.g., Color"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={`value-${index}`}>Value</Label>
                    <Input
                      id={`value-${index}`}
                      value={attribute.value}
                      onChange={(e) => updateAttribute(index, 'value', e.target.value)}
                      placeholder="e.g., Blue"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeAttribute(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={!isFormValid || isLoading}>
              {isLoading ? 'Minting...' : 'Mint NFT'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
