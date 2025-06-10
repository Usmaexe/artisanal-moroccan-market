"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import { UserRole } from "@/lib/auth/types";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { toast } from "react-hot-toast";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ 
  children, 
  allowedRoles = ["customer", "artisan", "admin"]
}: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    // Don't redirect while still loading
    if (isLoading) return;
    
    // If not logged in, redirect to login
    if (!user) {
      toast.error("You must be logged in to access this page");
      router.push(`/auth/login?returnUrl=${pathname}`);
      return;
    }
    
    // Check if user has required role
    if (!allowedRoles.includes(user.role)) {
      toast.error("You don't have permission to access this page");
      
      // Redirect based on role
      switch (user.role) {
        case "admin":
          router.push("/account/admin/dashboard");
          break;
        case "artisan":
          router.push("/account/artisan/dashboard");
          break;
        default:
          router.push("/account/dashboard");
      }
    }
  }, [user, isLoading, router, allowedRoles, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner h-12 w-12 border-4 border-t-amber-600 border-gray-200 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show nothing while redirecting
  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 