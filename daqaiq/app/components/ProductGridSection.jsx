"use client";

import { useState, useEffect } from "react";
import ProductGrid from "./ProductGrid";

export default function ProductGridSection({ products: initialProducts, startRow = 0, numRows = 1 }) {
  const [products, setProducts] = useState(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);
  const [error, setError] = useState(null);

  const productsPerRow = 5;
  const limit = numRows * productsPerRow;
  const skip = startRow * productsPerRow;

  useEffect(() => {
    // If products were passed directly, don't fetch
    if (initialProducts) {
      return;
    }

    async function fetchProducts() {
      try {
        setLoading(true);
        console.log(`Fetching products with limit=${limit} and skip=${skip}`);
        
        const response = await fetch(`/api/products?limit=${limit}&skip=${skip}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }
        
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [initialProducts, limit, skip]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(limit)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 aspect-square rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error: {error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700">No products found</h2>
        <p className="mt-2 text-gray-500">
          We couldn't find any products matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ProductGrid products={products} />
    </div>
  );
} 