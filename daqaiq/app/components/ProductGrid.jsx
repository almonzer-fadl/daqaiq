"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const localImages = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
  "/parts.png",
  "/parts-phone.png",
  "/about-image.jpg",
];

// Pre-calculate discounts to ensure consistency
const discounts = Array.from({ length: 120 }, (_, index) => {
  // Use a deterministic pattern instead of random
  return 10 + (index % 26); // This will generate discounts between 10-35
});

function generateMockProducts(count) {
  const categories = ["electronics", "fashion", "home"];
  const products = [];
  
  for (let i = 0; i < count; i++) {
    products.push({
      id: i + 1,
      title: `Product ${i + 1}`,
      category: categories[i % categories.length],
      image: localImages[i % localImages.length],
      discount: discounts[i], // Use pre-calculated discount
      description: `Discover local brands`,
      date: "14-20 March",
    });
  }
  return products;
}

// Generate products once outside the component
const MOCK_PRODUCTS = generateMockProducts(120);

export default function ProductGrid() {
  // Use the pre-generated products directly
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_PRODUCTS.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="group transform transition-transform duration-300 hover:scale-105"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900 to-orange-500">
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  EID
                </div>
              </div>
              
              <div className="absolute inset-0 p-6 text-white flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    UP TO {product.discount}% OFF
                  </h2>
                  <p className="text-sm">{product.description}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <button className="text-sm underline">
                    Shop now
                  </button>
                  <div className="text-sm">
                    {product.date}
                  </div>
                </div>
              </div>

              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-full">
                <div className="relative w-full h-full">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-4"
                    priority={product.id <= 6}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 