export interface Sweet {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
  image_url?: string;
  created_at?: string;
}

export type SweetCategory = 
  | 'Chocolates' 
  | 'Gummies' 
  | 'Hard Candy' 
  | 'Lollipops' 
  | 'Caramels' 
  | 'Marshmallows'
  | 'Seasonal';

export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
