"use client";

import { Package2, SearchX, RefreshCw } from "lucide-react";
import Link from "next/link";

interface NoProductsFoundProps {
  hasFilters: boolean;
  onClearFilters?: () => void;
  searchTerm?: string;
  categoryFilter?: string;
  // Customizable text props
  title?: string;
  description?: string;
  noFiltersTitle?: string;
  noFiltersDescription?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  footerText?: string;
}

export default function NoProductsFound({ 
  hasFilters, 
  onClearFilters, 
  searchTerm, 
  categoryFilter,
  // Custom text props with defaults
  title,
  description,
  noFiltersTitle,
  noFiltersDescription,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  footerText
}: NoProductsFoundProps) {
  // Default texts
  const defaultFilteredTitle = title || "No products found";
  const defaultFilteredDescription = description || "We couldn't find any products matching your current filters.";
  const defaultNoFiltersTitle = noFiltersTitle || "No products available";
  const defaultNoFiltersDescription = noFiltersDescription || "There are currently no products available. Please check back later or contact us for more information.";
  const defaultFooterText = footerText || "Looking for something specific? Try adjusting your search terms or browse our categories.";
  
  return (
    <div className="bg-white rounded-lg shadow-md p-12 text-center">
      <div className="flex justify-center mb-6">
        {hasFilters ? (
          <SearchX className="h-20 w-20 text-amber-300" />
        ) : (
          <Package2 className="h-20 w-20 text-amber-300" />
        )}
      </div>
      
      <h3 className="text-2xl font-semibold text-amber-800 mb-4">
        {hasFilters ? defaultFilteredTitle : defaultNoFiltersTitle}
      </h3>
      
      <div className="max-w-md mx-auto">
        {hasFilters ? (
          <div className="space-y-4">
            <p className="text-amber-600 mb-6">
              {defaultFilteredDescription}
              {searchTerm && (
                <>
                  <br />
                  <span className="font-medium">Search term:</span> "{searchTerm}"
                </>
              )}
              {categoryFilter && categoryFilter !== "all" && (
                <>
                  <br />
                  <span className="font-medium">Category:</span> {categoryFilter}
                </>
              )}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {onClearFilters && (
                <button
                  onClick={onClearFilters}
                  className="inline-flex items-center px-4 py-2 border border-amber-300 rounded-md shadow-sm text-sm font-medium text-amber-700 bg-white hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear Filters
                </button>
              )}
              
              <Link
                href={primaryButtonLink || "/products"}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                {primaryButtonText || "View All Products"}
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-amber-600 mb-6">
              {defaultNoFiltersDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={secondaryButtonLink || "/categories"}
                className="inline-flex items-center px-4 py-2 border border-amber-300 rounded-md shadow-sm text-sm font-medium text-amber-700 bg-white hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                {secondaryButtonText || "Browse Categories"}
              </Link>
              
              <Link
                href={primaryButtonLink || "/contact"}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                {primaryButtonText || "Contact Us"}
              </Link>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-8 pt-6 border-t border-amber-100">
        <p className="text-sm text-amber-500">
          {defaultFooterText}
        </p>
      </div>
    </div>
  );
}
