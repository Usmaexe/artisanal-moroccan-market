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

// Mock users for frontend demonstration
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

const initialState: AuthState = {
  user: null,
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
      // In a real app, this would be an API call to verify the session
      const savedUser = getFromLocalStorage('morocco_craft_user');
      
      if (savedUser) {
        setState({
          user: JSON.parse(savedUser),
          isLoading: false,
          error: null
        });
      } else {
        setState({
          user: null,
          isLoading: false,
          error: null
        });
      }
    } catch (error) {
      setState({
        user: null,
        isLoading: false,
        error: "Failed to retrieve session"
      });
    }
  };

  const login = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication logic
      const user = mockUsers.find(u => u.email === credentials.email);
      
      if (user && credentials.password === "password") {
        // For demo purposes, any password is "password"
        setToLocalStorage('morocco_craft_user', JSON.stringify(user));
        
        setState({
          user,
          isLoading: false,
          error: null
        });

        toast.success(`Welcome back, ${user.name}!`);
        
        // Redirect based on role
        if (user.role === "admin") {
          router.push("/account/admin/dashboard");
        } else if (user.role === "artisan") {
          router.push("/account/artisan/dashboard");
        } else {
          router.push("/account/dashboard");
        }
      } else {
        setState({
          user: null,
          isLoading: false,
          error: "Invalid email or password"
        });
        toast.error("Invalid email or password");
      }
    } catch (error) {
      setState({
        user: null,
        isLoading: false,
        error: "Login failed. Please try again."
      });
      toast.error("Login failed. Please try again.");
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock signup logic
      if (mockUsers.some(u => u.email === credentials.email)) {
        setState({
          user: null,
          isLoading: false,
          error: "Email already in use"
        });
        toast.error("Email already in use");
        return;
      }
      
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: credentials.name,
        email: credentials.email,
        role: credentials.role,
        image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56" // Default image
      };
      
      // In a real app, we would save to the database here
      setToLocalStorage('morocco_craft_user', JSON.stringify(newUser));
      
      setState({
        user: newUser,
        isLoading: false,
        error: null
      });
      
      toast.success("Account created successfully!");
      
      // Redirect based on role
      if (newUser.role === "admin") {
        router.push("/account/admin/dashboard");
      } else if (newUser.role === "artisan") {
        router.push("/account/artisan/dashboard");
      } else {
        router.push("/account/dashboard");
      }
    } catch (error) {
      setState({
        user: null,
        isLoading: false,
        error: "Signup failed. Please try again."
      });
      toast.error("Signup failed. Please try again.");
    }
  };

  const logout = () => {
    removeFromLocalStorage('morocco_craft_user');
    setState({
      user: null,
      isLoading: false,
      error: null
    });
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
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