import { Sweet } from '@/types/sweet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SweetCardProps {
  sweet: Sweet;
  onPurchase?: (sweet: Sweet) => void;
  isAuthenticated?: boolean;
}

export function SweetCard({ sweet, onPurchase, isAuthenticated = false }: SweetCardProps) {
  const isOutOfStock = sweet.quantity === 0;

  return (
    <article 
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:shadow-card",
        isOutOfStock && "opacity-75"
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-candy-peach/30 via-candy-pink/20 to-candy-lavender/30">
          <Package className="h-16 w-16 text-muted-foreground/40" />
        </div>
        
        {/* Category Badge */}
        <Badge 
          variant="secondary" 
          className="absolute left-3 top-3 bg-background/90 backdrop-blur-sm"
        >
          {sweet.category}
        </Badge>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
            <Badge variant="destructive" className="text-sm">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 font-display text-lg font-semibold text-foreground line-clamp-1">
          {sweet.name}
        </h3>
        
        {sweet.description && (
          <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
            {sweet.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-primary">
              ${sweet.price.toFixed(2)}
            </span>
            <p className="text-xs text-muted-foreground">
              {sweet.quantity} in stock
            </p>
          </div>

          <Button
            variant={isOutOfStock ? "secondary" : "default"}
            size="sm"
            disabled={isOutOfStock || !isAuthenticated}
            onClick={() => onPurchase?.(sweet)}
            className="gap-1"
          >
            <ShoppingBag className="h-4 w-4" />
            {isOutOfStock ? 'Sold Out' : 'Buy'}
          </Button>
        </div>
      </div>
    </article>
  );
}
