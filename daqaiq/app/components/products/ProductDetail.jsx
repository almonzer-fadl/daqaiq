"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetail({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
          <p className="mt-4 text-gray-600">The product you are looking for does not exist.</p>
          <Link href="/" className="mt-6 inline-block bg-primary text-white px-6 py-2 rounded-md">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
            <Image
              src={product.images?.[selectedImage] || '/images/products/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {product.discount > 0 && (
              <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                -{product.discount}%
              </div>
            )}
          </div>
          
          {/* Thumbnail Images */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative aspect-square overflow-hidden rounded-md ${
                    selectedImage === index ? 'ring-2 ring-primary' : 'ring-1 ring-gray-200'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image || '/images/products/placeholder.jpg'}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 20vw, 10vw"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              {product.rating && (
                <div className="flex items-center mr-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-300'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">({product.reviewCount || 0} reviews)</span>
                </div>
              )}
              {product.brand && (
                <div className="text-gray-600">
                  Brand: <span className="font-medium">{product.brand}</span>
                </div>
              )}
            </div>
            <div className="flex items-baseline mb-4">
              <span className="text-3xl font-bold text-primary">${product.price?.toFixed(2) || '0.00'}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="ml-3 text-lg text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>
          </div>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Key Features</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Specifications</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex">
                    <span className="font-medium text-gray-700 mr-2">{key}:</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <div className="mt-8">
            <div className="flex items-center mb-4">
              <div className="flex items-center border border-gray-300 rounded-md mr-4">
                <button
                  onClick={decrementQuantity}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-12 text-center border-0 focus:ring-0"
                />
                <button
                  onClick={incrementQuantity}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <div className="text-gray-600">
                {product.stock > 0 ? (
                  <span className="text-green-600">In Stock ({product.stock} available)</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="flex-1 bg-primary text-white py-3 px-6 rounded-md font-medium hover:bg-primary-dark transition-colors"
                disabled={product.stock <= 0}
              >
                Add to Cart
              </button>
              <button className="flex-1 border border-gray-300 py-3 px-6 rounded-md font-medium hover:bg-gray-50 transition-colors">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 