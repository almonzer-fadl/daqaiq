"use client";

import { useState, useEffect } from "react";
import ProductGrid from "./ProductGrid";

export default function ProductGridSection({ startRow = 0, numRows = 1 }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const productsPerRow = 5; // Updated to match the 5 columns in our grid
  const limit = numRows * productsPerRow;
  const skip = startRow * productsPerRow;

  useEffect(() => {
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
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API error response:', errorText);
          throw new Error(`Failed to fetch products: ${response.status} ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Products fetched:', data.products?.length || 0);
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [limit, skip]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-lg"></div>
            </div>
          ))}
        </div>
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
      <div className="text-center py-12">
        <p className="text-gray-500">No products found. Make sure you have added products to your database.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductGrid products={products} />
    </div>
  );
} 