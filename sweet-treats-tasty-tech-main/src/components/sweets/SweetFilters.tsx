import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';
import { categories } from '@/data/mockSweets';
import { cn } from '@/lib/utils';

interface SweetFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

export function SweetFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
}: SweetFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search sweets..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
            onClick={() => onSearchChange('')}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className={cn(
              "rounded-full transition-all",
              selectedCategory === category && "shadow-soft"
            )}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Price Range */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Price:</span>
        <Input
          type="number"
          placeholder="Min"
          value={priceRange[0] || ''}
          onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
          className="w-24"
          min={0}
        />
        <span className="text-muted-foreground">-</span>
        <Input
          type="number"
          placeholder="Max"
          value={priceRange[1] || ''}
          onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
          className="w-24"
          min={0}
        />
      </div>
    </div>
  );
}
