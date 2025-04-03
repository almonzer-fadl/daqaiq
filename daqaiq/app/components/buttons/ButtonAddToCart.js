'use client';

import { useState } from 'react';

export default function ButtonAddToCart({ productId }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement cart functionality
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulated delay
      console.log('Added product to cart:', productId);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="btn btn-primary flex-1"
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        'Add to Cart'
      )}
    </button>
  );
} 