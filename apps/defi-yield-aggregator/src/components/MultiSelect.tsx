import { Badge, Button, Card } from '@blockchain-playground/ui';
import { Check, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  value,
  onValueChange,
  placeholder = 'Select options...',
  className,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onValueChange(newValue);
  };

  const handleRemove = (optionValue: string) => {
    onValueChange(value.filter((v) => v !== optionValue));
  };

  const selectedOptions = options.filter((option) => value.includes(option.value));

  return (
    <div className={cn('relative', className)}>
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between h-auto min-h-[2.5rem] px-3 py-2"
      >
        <div className="flex flex-wrap gap-1">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option) => (
              <Badge
                key={option.value}
                variant="secondary"
                className="text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(option.value);
                }}
              >
                {option.label}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
      </Button>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto">
          <div className="p-1">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleToggle(option.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleToggle(option.value);
                  }
                }}
                className={cn(
                  'w-full flex items-center space-x-2 px-3 py-2 text-sm rounded-sm hover:bg-accent transition-colors',
                  value.includes(option.value) && 'bg-accent'
                )}
              >
                <div
                  className={cn(
                    'w-4 h-4 border rounded flex items-center justify-center',
                    value.includes(option.value) ? 'bg-primary border-primary' : 'border-border'
                  )}
                >
                  {value.includes(option.value) && (
                    <Check className="h-3 w-3 text-primary-foreground" />
                  )}
                </div>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </Card>
      )}

      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-transparent border-none cursor-default"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsOpen(false);
            }
          }}
          aria-label="Close dropdown"
        />
      )}
    </div>
  );
}
