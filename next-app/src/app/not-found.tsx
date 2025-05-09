import React from 'react';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
      <h1 className="text-morocco-blue text-9xl font-bold mb-6">404</h1>
      <h2 className="font-heading text-3xl mb-4 text-morocco-charcoal">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      <Button asChild className="btn-primary">
        <Link href="/">Return to Homepage</Link>
      </Button>
    </div>
  );
}