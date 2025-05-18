'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { categories } from '../../data/categories';

export default function SliderCategory() {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="my-12 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Browse Categories</h2>
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
        className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        {categories.map((category, index) => (
          <Link 
            href={`/category/${category.slug}`}
            key={index}
            className="flex-none w-60 group"
          >
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
              <figure className="relative h-40">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all" />
              </figure>
              <div className="card-body p-4">
                <h3 className="card-title justify-center text-lg group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-center text-gray-600">
                  {category.itemCount} items
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 