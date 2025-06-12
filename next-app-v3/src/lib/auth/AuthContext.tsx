"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { 
  AuthContextType, 
  AuthState, 
  LoginCredentials, 
  SignupCredentials, 
  User,
  UserRole
} from "./types";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getFromLocalStorage, setToLocalStorage, removeFromLocalStorage } from "./storage";

// API base URL - adjust this to match your backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Mock users for demo buttons only
const mockUsers: User[] = [
  {
    id: "1",
    name: "Customer Demo",
    email: "customer@example.com",
    role: "customer",
    image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56"
  },
  {
    id: "2",
    name: "Artisan Demo",
    email: "artisan@example.com",
    role: "artisan",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857"
  },
  {
    id: "3",
    name: "Admin Demo",
    email: "admin@example.com",
    role: "admin",
    image: "https://images.unsplash.com/photo-1608137050689-b08b643ea4f4"
  }
];

// Updated initial state to include token
const initialState: AuthState = {
  user: null,
  token: null, // Add token to initial state
  isLoading: true,
  error: null
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>(initialState);
  const router = useRouter();

  // Check for saved session on initial load
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const savedUser = getFromLocalStorage('morocco_craft_user');
      const savedToken = getFromLocalStorage('morocco_craft_token');
      
      if (savedUser && savedToken) {
        // In a real app, you might want to verify the token with the backend
        setState({
          user: JSON.parse(savedUser),
          token: savedToken, // Include token in state
          isLoading: false,
          error: null
        });
      } else {
        setState({
          user: null,
          token: null, // Include token in state
          isLoading: false,
          error: null
        });
      }
    } catch (error) {
      setState({
        user: null,
        token: null, // Include token in state
        isLoading: false,
        error: "Failed to retrieve session"
      });
    }
  };

  const login = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Check if it's a demo account first (for the demo buttons)
      const mockUser = mockUsers.find(u => u.email === credentials.email);
      if (mockUser && credentials.password === "password") {
        const demoToken = 'demo-token';
        setToLocalStorage('morocco_craft_user', JSON.stringify(mockUser));
        setToLocalStorage('morocco_craft_token', demoToken);
        
        setState({
          user: mockUser,
          token: demoToken, // Include token in state
          isLoading: false,
          error: null
        });

        toast.success(`Welcome back, ${mockUser.name}!`);
        
        // Redirect based on role
        if (mockUser.role === "admin") {
          router.push("/account/admin/dashboard");
        } else if (mockUser.role === "artisan") {
          router.push("/account/artisan/dashboard");
        } else {
          router.push("/account/dashboard");
        }
        return;
      }

      // Real backend authentication
      console.log('Making API call to:', `${API_BASE_URL}/auth/login`);
      console.log('With credentials:', { email: credentials.email, password: '[HIDDEN]' });

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save user data and token
      setToLocalStorage('morocco_craft_user', JSON.stringify(data.user));
      setToLocalStorage('morocco_craft_token', data.token);
      
      setState({
        user: data.user,
        token: data.token, // Include token in state
        isLoading: false,
        error: null
      });

      toast.success(`Welcome back, ${data.user.name}!`);
      
      // Redirect based on role
      if (data.user.role === "admin") {
        router.push("/account/admin/dashboard");
      } else if (data.user.role === "artisan") {
        router.push("/account/artisan/dashboard");
      } else {
        router.push("/account/dashboard");
      }

    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error instanceof Error ? error.message : "Login failed. Please try again.";
      
      setState({
        user: null,
        token: null, // Include token in state
        isLoading: false,
        error: errorMessage
      });
      toast.error(errorMessage);
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      console.log('Making API call to:', `${API_BASE_URL}/auth/register`);

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          role: credentials.role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      // After successful registration, log the user in
      await login({ email: credentials.email, password: credentials.password });

    } catch (error) {
      console.error('Signup error:', error);
      const errorMessage = error instanceof Error ? error.message : "Signup failed. Please try again.";
      
      setState({
        user: null,
        token: null, // Include token in state
        isLoading: false,
        error: errorMessage
      });
      toast.error(errorMessage);
    }
  };

  const logout = () => {
    removeFromLocalStorage('morocco_craft_user');
    removeFromLocalStorage('morocco_craft_token');
    setState({
      user: null,
      token: null, // Include token in state
      isLoading: false,
      error: null
    });
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        ...state, // This now includes token
        login,
        signup,
        logout,
        checkSession
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};