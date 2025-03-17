"use client";

import Image from "next/image";
import Link from "next/link";

const localImages = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
];

function generateMockProducts(startIndex, count) {
  return Array.from({ length: count }, (_, i) => ({
    id: startIndex + i + 1,
    title: `Product ${startIndex + i + 1}`,
    image: localImages[(startIndex + i) % localImages.length],
  }));
}

export default function ProductGridSection({ startRow = 0, numRows = 1 }) {
  const productsPerRow = 3;
  const products = generateMockProducts(startRow * productsPerRow, numRows * productsPerRow);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="block aspect-[4/3] relative rounded-2xl overflow-hidden"
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              priority={product.id <= 6}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
        ))}
      </div>
    </div>
  );
} 