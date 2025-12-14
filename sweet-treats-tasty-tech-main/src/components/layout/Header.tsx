import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Candy, Menu, X, ShoppingBag, User, LogOut } from 'lucide-react';

interface HeaderProps {
  isAuthenticated?: boolean;
  isAdmin?: boolean;
  onLogout?: () => void;
}

export function Header({ isAuthenticated = false, isAdmin = false, onLogout }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-soft">
            <Candy className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Sweet<span className="text-primary">Haven</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link 
            to="/" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Shop
          </Link>
          {isAdmin && (
            <Link 
              to="/admin" 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" onClick={() => navigate('/shop')}>
                <ShoppingBag className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/auth')}>
                Sign In
              </Button>
              <Button variant="default" onClick={() => navigate('/auth?mode=register')}>
                Get Started
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container flex flex-col gap-2 py-4">
            <Link 
              to="/" 
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
              {isAuthenticated ? (
                <Button variant="outline" onClick={onLogout} className="w-full justify-start">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => { navigate('/auth'); setIsMobileMenuOpen(false); }} className="w-full">
                    Sign In
                  </Button>
                  <Button variant="default" onClick={() => { navigate('/auth?mode=register'); setIsMobileMenuOpen(false); }} className="w-full">
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
