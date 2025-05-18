'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function SliderProduct({ categoryData, sectionId }) {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!categoryData || categoryData.length === 0) {
    return null;
  }

  return (
    <div className="my-8 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{sectionId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => scroll('left')}
            className="btn btn-circle btn-sm"
          >
            ←
          </button>
          <button 
            onClick={() => scroll('right')}
            className="btn btn-circle btn-sm"
          >
            →
          </button>
        </div>
      </div>

      <div 
        ref={sliderRef}
        className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        {categoryData.map((product, index) => (
          <Link 
            href={`/products/${product.slug}`}
            key={index}
            className="flex-none w-72 group"
          >
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
              <figure className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <div className="card-actions justify-between items-center mt-2">
                  <span className="text-lg font-bold">${product.price}</span>
                  <button className="btn btn-primary btn-sm">View Details</button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 