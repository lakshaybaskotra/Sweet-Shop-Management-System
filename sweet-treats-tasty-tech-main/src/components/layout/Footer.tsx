import { Link } from 'react-router-dom';
import { Candy, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-soft">
                <Candy className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                Sweet<span className="text-primary">Haven</span>
              </span>
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground">
              Handcrafted sweets made with love. From artisan chocolates to classic candies, 
              we bring joy to every bite.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-display text-sm font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Chocolates" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Chocolates
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Gummies" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Gummies
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 font-display text-sm font-semibold text-foreground">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/auth" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  My Account
                </Link>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  help@sweethaven.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart className="h-4 w-4 fill-primary text-primary" /> by SweetHaven
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SweetHaven. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
