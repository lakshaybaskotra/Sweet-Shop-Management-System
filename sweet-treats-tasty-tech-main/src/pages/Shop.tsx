import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SweetGrid } from '@/components/sweets/SweetGrid';
import { SweetFilters } from '@/components/sweets/SweetFilters';
import { mockSweets } from '@/data/mockSweets';
import { Sweet } from '@/types/sweet';
import { useToast } from '@/hooks/use-toast';

const Shop = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sweets, setSweets] = useState<Sweet[]>(mockSweets);

  // Filter sweets based on search, category, and price
  const filteredSweets = useMemo(() => {
    return sweets.filter((sweet) => {
      // Search filter
      const matchesSearch = sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sweet.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sweet.description?.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === 'All' || sweet.category === selectedCategory;

      // Price filter
      const matchesPrice = sweet.price >= priceRange[0] && 
        (priceRange[1] === 0 || sweet.price <= priceRange[1]);

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [sweets, searchQuery, selectedCategory, priceRange]);

  const handlePurchase = (sweet: Sweet) => {
    // Update local state (in real app, this would call the API)
    setSweets(prev => 
      prev.map(s => 
        s.id === sweet.id 
          ? { ...s, quantity: Math.max(0, s.quantity - 1) }
          : s
      )
    );

    toast({
      title: "Purchase successful!",
      description: `You bought 1x ${sweet.name} for $${sweet.price.toFixed(2)}`,
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-8 lg:py-12">
        <div className="container">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="mb-2 font-display text-3xl font-bold text-foreground lg:text-4xl">
              Shop All Sweets
            </h1>
            <p className="text-muted-foreground">
              Browse our complete collection of handcrafted confections
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 rounded-2xl border border-border bg-card p-4 shadow-soft lg:p-6">
            <SweetFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
            />
          </div>

          {/* Results Count */}
          <p className="mb-6 text-sm text-muted-foreground">
            Showing {filteredSweets.length} of {sweets.length} products
          </p>

          {/* Products Grid */}
          <SweetGrid
            sweets={filteredSweets}
            onPurchase={handlePurchase}
            isAuthenticated={false} // Will be connected to auth later
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
