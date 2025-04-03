'use client';

import { useState } from 'react';

export default function ButtonQuantitySelector({ maxQuantity = 99, onQuantityChange }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  return (
    <div className="join border border-gray-300 rounded-md">
      <button 
        className="join-item btn btn-ghost px-4"
        onClick={() => handleQuantityChange(quantity - 1)}
        disabled={quantity <= 1}
      >
        -
      </button>
      <input
        type="text"
        className="join-item w-16 text-center"
        value={quantity}
        readOnly
      />
      <button 
        className="join-item btn btn-ghost px-4"
        onClick={() => handleQuantityChange(quantity + 1)}
        disabled={quantity >= maxQuantity}
      >
        +
      </button>
    </div>
  );
} 