"use client";

import Image from "next/image";
import Link from "next/link";

async function getProducts(limit = 12, skip = 0) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?limit=${limit}&skip=${skip}`, {
      cache: 'no-store'
    });
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function ProductGridSection({ startRow = 0, numRows = 1 }) {
  const productsPerRow = 3;
  const limit = numRows * productsPerRow;
  const skip = startRow * productsPerRow;
  
  const products = await getProducts(limit, skip);

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            href={`/products/${product._id}`}
            key={product._id}
            className="group"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.images[0] || '/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={product._id <= 6}
              />
              {product.discount > 0 && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                  -{product.discount}%
                </div>
              )}
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{product.name}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              {product.rating && (
                <div className="flex items-center space-x-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-300'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({product.reviewCount})</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 