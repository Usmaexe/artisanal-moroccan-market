# Search Functionality Documentation

This document outlines the comprehensive search functionality implemented for the Artisanal Moroccan Market website.

## Overview

The search functionality provides users with a powerful, aesthetically pleasing way to find products across the entire marketplace. It includes real-time search suggestions, keyboard shortcuts, and advanced filtering capabilities.

## Features

### 🔍 Search Modal
- **Quick Access**: Click the search icon or use keyboard shortcuts (⌘K, Ctrl+K, or "/")
- **Real-time Results**: Live search as you type with debounced API calls
- **Product Previews**: Shows product images, names, categories, artisan info, and prices
- **Smart Suggestions**: Recent searches and popular search terms
- **Category Browsing**: Quick access to popular product categories

### ⌨️ Keyboard Shortcuts
- `⌘K` or `Ctrl+K`: Open search modal from anywhere
- `/`: Alternative shortcut to open search (like GitHub)
- `Enter`: Navigate to full search results page
- `Esc`: Close search modal

### 📱 Responsive Design
- Mobile-optimized search modal
- Touch-friendly interface
- Adaptive layout for different screen sizes

### 🎯 Advanced Search Features
- **Multi-field Search**: Searches across product names, descriptions, categories, artisan names, locations, features, and materials
- **Search History**: Remembers recent searches (stored in localStorage)
- **Popular Suggestions**: Pre-defined popular search terms
- **Category Quick Links**: Direct navigation to category pages

## Components

### SearchContext (`/lib/search/SearchContext.tsx`)
Provides global search state management:
- Search term management
- Real-time API integration
- Search results caching
- Recent searches persistence

### SearchIndicator (`/components/layout/SearchIndicator.tsx`)
Search icon in the header with tooltip showing keyboard shortcut.

### SearchModal (`/components/layout/SearchModal.tsx`)
The main search interface with:
- Search input with live suggestions
- Product result previews
- Recent searches display
- Popular category links
- Loading and empty states

### SearchShortcuts (`/components/layout/SearchShortcuts.tsx`)
Global keyboard event handler for search shortcuts.

### Search Results Page (`/app/search/page.tsx`)
Dedicated page for full search results with filtering and sorting.

## API Integration

The search functionality integrates with the backend API endpoint:
```
GET http://localhost:5000/api/products
```

Products are filtered client-side to provide instant search results while typing.

## Styling

- Consistent with the site's amber color scheme
- Smooth animations and transitions
- Hover effects and visual feedback
- Loading spinners for better UX

## Best Practices Implemented

1. **Debounced Search**: Prevents excessive API calls while typing
2. **Accessibility**: Proper ARIA labels, keyboard navigation
3. **Performance**: Efficient filtering and caching
4. **User Experience**: Clear visual feedback and intuitive interface
5. **Mobile-First**: Responsive design for all devices
6. **SEO-Friendly**: Search results have dedicated URLs

## Usage

### For Users
1. Click the search icon in the header or use ⌘K
2. Start typing to see instant results
3. Click on a product to view details
4. Press Enter to see all results
5. Use recent searches for quick access

### For Developers
```tsx
import { useSearch } from '@/lib/search/SearchContext';

function MyComponent() {
  const { 
    searchTerm, 
    setSearchTerm, 
    searchResults, 
    isSearching,
    setIsSearchOpen 
  } = useSearch();
  
  // Component logic
}
```

## Future Enhancements

- [ ] Advanced filters (price range, artisan, location)
- [ ] Search analytics and popular terms tracking  
- [ ] Voice search capability
- [ ] Search autocomplete with API suggestions
- [ ] Saved searches functionality
- [ ] Search within specific categories

## Performance Considerations

- Debounced API calls (300ms delay)
- Client-side result caching
- Efficient filtering algorithms
- Lazy loading for large result sets
- Memory management for search history
