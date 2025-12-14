import { Sweet } from '@/types/sweet';
import { SweetCard } from './SweetCard';
import { Package } from 'lucide-react';

interface SweetGridProps {
  sweets: Sweet[];
  onPurchase?: (sweet: Sweet) => void;
  isAuthenticated?: boolean;
  isLoading?: boolean;
}

export function SweetGrid({ sweets, onPurchase, isAuthenticated = false, isLoading = false }: SweetGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] animate-pulse rounded-2xl bg-muted"
          />
        ))}
      </div>
    );
  }

  if (sweets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
          No sweets found
        </h3>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {sweets.map((sweet, index) => (
        <div
          key={sweet.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <SweetCard
            sweet={sweet}
            onPurchase={onPurchase}
            isAuthenticated={isAuthenticated}
          />
        </div>
      ))}
    </div>
  );
}
