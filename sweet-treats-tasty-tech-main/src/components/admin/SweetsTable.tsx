import { Sweet } from '@/types/sweet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil, Trash2, Package, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SweetsTableProps {
  sweets: Sweet[];
  onEdit: (sweet: Sweet) => void;
  onDelete: (sweet: Sweet) => void;
  onRestock: (sweet: Sweet) => void;
}

export function SweetsTable({ sweets, onEdit, onDelete, onRestock }: SweetsTableProps) {
  if (sweets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 py-12 text-center">
        <Package className="mb-4 h-12 w-12 text-muted-foreground/50" />
        <h3 className="mb-1 font-display text-lg font-semibold text-foreground">No sweets found</h3>
        <p className="text-sm text-muted-foreground">Add your first sweet to get started</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card shadow-soft">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sweets.map((sweet) => (
            <TableRow key={sweet.id}>
              <TableCell>
                <div>
                  <p className="font-medium text-foreground">{sweet.name}</p>
                  {sweet.description && (
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {sweet.description}
                    </p>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{sweet.category}</Badge>
              </TableCell>
              <TableCell className="text-right font-medium">
                ${sweet.price.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {sweet.quantity === 0 && (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  )}
                  <span
                    className={cn(
                      "font-medium",
                      sweet.quantity === 0 && "text-destructive",
                      sweet.quantity > 0 && sweet.quantity <= 10 && "text-yellow-600"
                    )}
                  >
                    {sweet.quantity}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRestock(sweet)}
                    title="Restock"
                  >
                    <Package className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(sweet)}
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(sweet)}
                    title="Delete"
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
