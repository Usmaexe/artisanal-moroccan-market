"use client";

import { CartProvider } from "../../context/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "../../components/ui/toaster";
import { Toaster as Sonner } from "../../components/ui/sonner";
import { TooltipProvider } from "../../components/ui/tooltip";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create a new QueryClient instance for each client
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          {children}
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}