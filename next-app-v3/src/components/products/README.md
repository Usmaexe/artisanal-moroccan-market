# Product Components Documentation

This directory contains reusable components for the product listing and filtering functionality.

## Components

### FilterBar
A comprehensive filter and search component for product listings.

**Features:**
- Search by product name or category
- Filter by category
- Sort by various criteria (featured, price, name, date)
- Visual filter indicators with remove options
- Responsive design with proper accessibility

**Props:**
- `searchTerm`: string - Current search term
- `setSearchTerm`: function - Update search term
- `sortOption`: string - Current sort option
- `setSortOption`: function - Update sort option
- `categoryFilter`: string - Current category filter
- `setCategoryFilter`: function - Update category filter
- `categories`: string[] - Available categories

### NoProductsFound
A user-friendly empty state component shown when no products match the current filters.

**Features:**
- Different states for filtered vs non-filtered views
- Clear action buttons to resolve the empty state
- Contextual messaging based on active filters
- Links to clear filters or browse categories

**Props:**
- `hasFilters`: boolean - Whether any filters are active
- `onClearFilters`: function - Callback to clear all filters
- `searchTerm`: string (optional) - Current search term for display
- `categoryFilter`: string (optional) - Current category filter for display

### LoadingSpinner
A reusable loading indicator component.

**Features:**
- Customizable size (sm, md, lg)
- Customizable message
- Consistent styling with the site theme

**Props:**
- `message`: string (optional) - Loading message to display
- `size`: "sm" | "md" | "lg" (optional) - Size of the spinner

## Usage Example

```tsx
import FilterBar from "@/components/products/FilterBar";
import NoProductsFound from "@/components/products/NoProductsFound";
import LoadingSpinner from "@/components/common/LoadingSpinner";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("featured");
  const [categories, setCategories] = useState([]);

  const hasFilters = searchTerm !== "" || categoryFilter !== "all";

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setSortOption("featured");
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading products..." size="lg" />;
  }

  return (
    <div>
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOption={sortOption}
        setSortOption={setSortOption}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
      />
      
      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <NoProductsFound
          hasFilters={hasFilters}
          onClearFilters={clearFilters}
          searchTerm={searchTerm}
          categoryFilter={categoryFilter !== "all" ? categoryFilter : undefined}
        />
      )}
    </div>
  );
}
```

## Styling

All components use Tailwind CSS and follow the site's amber-themed color scheme:
- Primary colors: amber-600, amber-700, amber-800
- Accent colors: amber-50, amber-100, amber-200
- Focus states use amber-500 for consistency

## Accessibility

All components include proper accessibility features:
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Screen reader friendly text
- Focus management
