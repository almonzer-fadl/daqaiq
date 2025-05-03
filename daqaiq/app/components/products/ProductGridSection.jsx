"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import styles from './ProductGrid.module.css';

export default function ProductGridSection({ products: initialProducts, startRow = 0, numRows = 1 }) {
  const [products, setProducts] = useState(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);
  const [error, setError] = useState(null);

  const productsPerRow = 3;
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
        console.log('Fetched products:', data);
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
      <div className={styles.productsGrid}>
        {[...Array(3)].map((_, index) => (
          <div key={index} className={`${styles.productCard} animate-pulse`}>
            <div className="w-full h-full bg-gray-200"></div>
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
      </div>
    );
  }

  return (
    <div className={styles.productsGrid}>
      {products.map(product => (
        <Link 
          href={`/products/${product.slug}`}
          key={product._id}
          className={styles.productCard}
        >
          <div className={styles.productImage}>
            <Image
              src={product.images?.[0] || '/placeholder.jpg'}
              alt={product.name || ''}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
              onError={(e) => {
                e.target.src = '/placeholder.jpg';
              }}
            />
          </div>
        </Link>
      ))}
    </div>
  );
} 