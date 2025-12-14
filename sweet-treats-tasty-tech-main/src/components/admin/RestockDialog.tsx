import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Sweet } from '@/types/sweet';
import { Package } from 'lucide-react';

interface RestockDialogProps {
  sweet: Sweet | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRestock: (sweetId: string, amount: number) => void;
}

export function RestockDialog({ sweet, open, onOpenChange, onRestock }: RestockDialogProps) {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(amount, 10);
    
    if (isNaN(num) || num <= 0) {
      setError('Please enter a valid positive number');
      return;
    }

    if (sweet) {
      onRestock(sweet.id, num);
      setAmount('');
      setError('');
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setAmount('');
    setError('');
    onOpenChange(false);
  };

  if (!sweet) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Restock Inventory
          </DialogTitle>
          <DialogDescription>
            Add more units of <strong>{sweet.name}</strong> to inventory.
            <br />
            Current stock: <strong>{sweet.quantity}</strong> units
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="restock-amount">Amount to Add</Label>
              <Input
                id="restock-amount"
                type="number"
                min="1"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError('');
                }}
                placeholder="Enter quantity..."
                autoFocus
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            {amount && !isNaN(parseInt(amount, 10)) && parseInt(amount, 10) > 0 && (
              <p className="text-sm text-muted-foreground">
                New total: <strong>{sweet.quantity + parseInt(amount, 10)}</strong> units
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              Restock
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
