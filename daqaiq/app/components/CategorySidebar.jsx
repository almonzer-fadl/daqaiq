"use client";

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function CategorySidebar({ 
  categories, 
  currentCategorySlug,
  currentSubcategorySlug 
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Find the current category
  const currentCategory = categories.find(cat => cat.slug === currentCategorySlug);
  
  if (!categories || categories.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <p className="text-gray-500">No categories found</p>
      </div>
    );
  }
  
  return (
    <div className="bg-base-100 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category._id} className="space-y-2">
            <Link
              href={`/category/${category.slug}`}
              className={`block font-medium hover:text-primary transition-colors ${
                currentCategorySlug === category.slug ? 'text-primary' : 'text-base-content'
              }`}
            >
              {category.name}
              {category.count > 0 && (
                <span className="ml-2 text-sm text-gray-500">({category.count})</span>
              )}
            </Link>
            
            {category.subcategories && category.subcategories.length > 0 && (
              <div className="pl-4 space-y-2">
                {category.subcategories.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/category/${category.slug}?subcategory=${sub.slug}`}
                    className={`block text-sm hover:text-primary transition-colors ${
                      currentSubcategorySlug === sub.slug ? 'text-primary' : 'text-base-content'
                    }`}
                  >
                    {sub.name}
                    {sub.count > 0 && (
                      <span className="ml-2 text-xs text-gray-500">({sub.count})</span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Price Range Filter */}
      <div className="mt-8">
        <h3 className="text-md font-semibold mb-3">Price Range</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="checkbox" id="price-1" className="mr-2" />
            <label htmlFor="price-1">Under $50</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="price-2" className="mr-2" />
            <label htmlFor="price-2">$50 - $100</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="price-3" className="mr-2" />
            <label htmlFor="price-3">$100 - $200</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="price-4" className="mr-2" />
            <label htmlFor="price-4">$200+</label>
          </div>
        </div>
      </div>
      
      {/* Brand Filter */}
      {currentCategory && (
        <div className="mt-8">
          <h3 className="text-md font-semibold mb-3">Brands</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="all-brands" className="mr-2" />
              <label htmlFor="all-brands">All Brands</label>
            </div>
            {/* Add dynamic brand filters here based on the current category */}
          </div>
        </div>
      )}
      
      {/* Rating Filter */}
      <div className="mt-8">
        <h3 className="text-md font-semibold mb-3">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center">
              <input type="checkbox" id={`rating-${rating}`} className="mr-2" />
              <label htmlFor={`rating-${rating}`} className="flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < rating ? 'fill-current' : 'fill-gray-300'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1">& Up</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 