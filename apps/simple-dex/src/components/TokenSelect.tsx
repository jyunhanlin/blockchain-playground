import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { Token } from '@/lib/chains';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface TokenSelectProps {
  tokens: Token[];
  selectedToken: Token | null;
  onTokenSelect: (token: Token) => void;
  disabled?: boolean;
}

export function TokenSelect({ tokens, selectedToken, onTokenSelect, disabled }: TokenSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTokenClick = (token: Token) => {
    onTokenSelect(token);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'h-12 w-full justify-between bg-background hover:bg-accent/50',
          selectedToken && 'pl-3'
        )}
      >
        {selectedToken ? (
          <div className="flex items-center gap-2">
            <img
              src={selectedToken.logoURI}
              alt={selectedToken.symbol}
              className="h-6 w-6 rounded-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="flex flex-col items-start">
              <span className="font-medium">{selectedToken.symbol}</span>
              <span className="text-xs text-muted-foreground">{selectedToken.name}</span>
            </div>
          </div>
        ) : (
          <span className="text-muted-foreground">Select a token</span>
        )}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </Button>

      {isOpen && (
        <Card className="absolute top-full mt-1 w-full z-50 max-h-80 overflow-hidden">
          <div className="p-3 border-b">
            <Input
              placeholder="Search tokens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9"
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredTokens.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">No tokens found</div>
            ) : (
              filteredTokens.map((token) => (
                <button
                  key={token.address}
                  type="button"
                  onClick={() => handleTokenClick(token)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleTokenClick(token);
                  }}
                  className="w-full p-3 hover:bg-accent/50 transition-colors flex items-center gap-3 text-left"
                >
                  <img
                    src={token.logoURI}
                    alt={token.symbol}
                    className="h-8 w-8 rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div>
                    <div className="font-medium">{token.symbol}</div>
                    <div className="text-sm text-muted-foreground">{token.name}</div>
                  </div>
                </button>
              ))
            )}
          </div>
        </Card>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsOpen(false);
          }}
          role="button"
          tabIndex={0}
          aria-label="Close token selection"
        />
      )}
    </div>
  );
}
