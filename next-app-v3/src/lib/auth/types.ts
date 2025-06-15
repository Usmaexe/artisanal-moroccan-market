export type UserRole = 'customer' | 'artisan' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image_url?: string;
  phone?: string;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  token: string | null;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
  checkSession: () => Promise<void>;
  updateUser: (updatedUserData: Partial<User>) => void;
}