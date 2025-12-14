import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { SweetCard } from '@/components/sweets/SweetCard';
import { mockSweets } from '@/data/mockSweets';
import { ArrowRight, Sparkles, Shield, Truck } from 'lucide-react';

const Index = () => {
  const featuredSweets = mockSweets.slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-hero-gradient py-20 lg:py-32">
          {/* Decorative elements */}
          <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-candy-pink/20 blur-3xl" />
          <div className="absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-candy-peach/20 blur-3xl" />
          
          <div className="container relative">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Handcrafted with love</span>
              </div>
              
              <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Discover the{' '}
                <span className="text-gradient">Sweetest</span>
                <br />
                Treats in Town
              </h1>
              
              <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
                From artisan chocolates to classic candies, explore our curated collection
                of premium sweets that bring joy to every moment.
              </p>
              
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/shop">
                    Shop Now
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/auth">Create Account</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-b border-border bg-secondary/30 py-12">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent">
                  <Sparkles className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">Premium Quality</h3>
                  <p className="text-sm text-muted-foreground">Handcrafted with finest ingredients</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent">
                  <Truck className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">Fast Delivery</h3>
                  <p className="text-sm text-muted-foreground">Fresh sweets delivered to your door</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent">
                  <Shield className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">Secure Checkout</h3>
                  <p className="text-sm text-muted-foreground">Your payment is always protected</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="mb-2 font-display text-3xl font-bold text-foreground">
                  Featured Sweets
                </h2>
                <p className="text-muted-foreground">
                  Our most popular treats, loved by customers
                </p>
              </div>
              <Button variant="ghost" asChild className="hidden sm:flex">
                <Link to="/shop">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredSweets.map((sweet, index) => (
                <div
                  key={sweet.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <SweetCard sweet={sweet} />
                </div>
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Button variant="outline" asChild>
                <Link to="/shop">
                  View All Products
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16 lg:py-20">
          <div className="container text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground">
              Ready to Satisfy Your Sweet Tooth?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-primary-foreground/80">
              Join thousands of happy customers and discover why SweetHaven is the 
              go-to destination for premium sweets.
            </p>
            <Button 
              variant="secondary" 
              size="lg" 
              asChild
              className="shadow-card"
            >
              <Link to="/auth?mode=register">
                Create Free Account
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
