import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SweetsTable } from '@/components/admin/SweetsTable';
import { SweetForm } from '@/components/admin/SweetForm';
import { RestockDialog } from '@/components/admin/RestockDialog';
import { mockSweets } from '@/data/mockSweets';
import { Sweet } from '@/types/sweet';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, Search, Package, DollarSign, AlertTriangle, TrendingUp } from 'lucide-react';

const Admin = () => {
  const { toast } = useToast();
  const [sweets, setSweets] = useState<Sweet[]>(mockSweets);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
  const [deletingSweet, setDeletingSweet] = useState<Sweet | null>(null);
  const [restockSweet, setRestockSweet] = useState<Sweet | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter sweets by search
  const filteredSweets = sweets.filter((sweet) =>
    sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sweet.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stats
  const totalProducts = sweets.length;
  const totalValue = sweets.reduce((sum, s) => sum + s.price * s.quantity, 0);
  const outOfStock = sweets.filter(s => s.quantity === 0).length;
  const lowStock = sweets.filter(s => s.quantity > 0 && s.quantity <= 10).length;

  // Handlers
  const handleAddSweet = (data: Omit<Sweet, 'id' | 'created_at'>) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newSweet: Sweet = {
        ...data,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
      };
      
      setSweets(prev => [newSweet, ...prev]);
      setIsFormOpen(false);
      setIsLoading(false);
      
      toast({
        title: 'Sweet added!',
        description: `${data.name} has been added to your inventory.`,
      });
    }, 500);
  };

  const handleEditSweet = (data: Omit<Sweet, 'id' | 'created_at'>) => {
    if (!editingSweet) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      setSweets(prev =>
        prev.map(s =>
          s.id === editingSweet.id ? { ...s, ...data } : s
        )
      );
      setEditingSweet(null);
      setIsLoading(false);
      
      toast({
        title: 'Sweet updated!',
        description: `${data.name} has been updated.`,
      });
    }, 500);
  };

  const handleDeleteSweet = () => {
    if (!deletingSweet) return;
    
    setSweets(prev => prev.filter(s => s.id !== deletingSweet.id));
    
    toast({
      title: 'Sweet deleted',
      description: `${deletingSweet.name} has been removed from inventory.`,
    });
    
    setDeletingSweet(null);
  };

  const handleRestock = (sweetId: string, amount: number) => {
    setSweets(prev =>
      prev.map(s =>
        s.id === sweetId ? { ...s, quantity: s.quantity + amount } : s
      )
    );
    
    const sweet = sweets.find(s => s.id === sweetId);
    
    toast({
      title: 'Inventory restocked!',
      description: `Added ${amount} units to ${sweet?.name}.`,
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header isAuthenticated isAdmin onLogout={() => {}} />
      
      <main className="flex-1 py-8 lg:py-12">
        <div className="container">
          {/* Page Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="mb-1 font-display text-3xl font-bold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your sweet shop inventory
              </p>
            </div>
            <Button onClick={() => setIsFormOpen(true)} size="lg">
              <Plus className="h-5 w-5" />
              Add Sweet
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold text-foreground">{totalProducts}</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                  <DollarSign className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Inventory Value</p>
                  <p className="text-2xl font-bold text-foreground">${totalValue.toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Out of Stock</p>
                  <p className="text-2xl font-bold text-foreground">{outOfStock}</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Low Stock</p>
                  <p className="text-2xl font-bold text-foreground">{lowStock}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6 flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Showing {filteredSweets.length} of {sweets.length} products
            </p>
          </div>

          {/* Table */}
          <SweetsTable
            sweets={filteredSweets}
            onEdit={setEditingSweet}
            onDelete={setDeletingSweet}
            onRestock={setRestockSweet}
          />
        </div>
      </main>

      <Footer />

      {/* Add Sweet Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Add New Sweet</DialogTitle>
          </DialogHeader>
          <SweetForm
            onSubmit={handleAddSweet}
            onCancel={() => setIsFormOpen(false)}
            isLoading={isLoading}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Sweet Dialog */}
      <Dialog open={!!editingSweet} onOpenChange={(open) => !open && setEditingSweet(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Edit Sweet</DialogTitle>
          </DialogHeader>
          <SweetForm
            sweet={editingSweet}
            onSubmit={handleEditSweet}
            onCancel={() => setEditingSweet(null)}
            isLoading={isLoading}
          />
        </DialogContent>
      </Dialog>

      {/* Restock Dialog */}
      <RestockDialog
        sweet={restockSweet}
        open={!!restockSweet}
        onOpenChange={(open) => !open && setRestockSweet(null)}
        onRestock={handleRestock}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingSweet} onOpenChange={(open) => !open && setDeletingSweet(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Sweet</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{deletingSweet?.name}</strong>?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSweet}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
