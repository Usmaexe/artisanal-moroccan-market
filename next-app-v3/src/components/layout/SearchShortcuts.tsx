'use client';

import { useSearch } from '@/lib/search/SearchContext';
import { useEffect } from 'react';

export default function SearchShortcuts() {
  const { setIsSearchOpen } = useSearch();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      
      // Forward slash to focus search (like GitHub)
      if (e.key === '/' && !isInputFocused()) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    const isInputFocused = () => {
      const activeElement = document.activeElement;
      return activeElement instanceof HTMLInputElement || 
             activeElement instanceof HTMLTextAreaElement ||
             activeElement?.getAttribute('contenteditable') === 'true';
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  return null; // This component doesn't render anything
}