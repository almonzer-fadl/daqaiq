import { getProductById } from '../../lib/data';
import Image from 'next/image';
import ButtonAddToCart from '../../components/buttons/ButtonAddToCart';
import ButtonQuantitySelector from '../../components/buttons/ButtonQuantitySelector';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const product = await getProductById(params.id);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | Daqaiq`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Images */}
            <div className="space-y-4">
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-white">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1).map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-md overflow-hidden bg-white border hover:border-primary cursor-pointer transition-colors">
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 2}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 25vw, 12vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6">
              {/* Brand and Title */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-lg text-gray-600 mt-2">{product.brand}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-300'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-4">
                <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
                )}
                {product.oldPrice && (
                  <span className="text-sm font-semibold text-green-600">
                    Save {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                  </span>
                )}
              </div>

              {/* Color Selection */}
              {product.colors && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className="w-10 h-10 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary hover:border-primary transition-colors"
                        style={{ backgroundColor: color }}
                        aria-label={`Select ${color} color`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:border-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <ButtonQuantitySelector maxQuantity={product.stock} />
                  <ButtonAddToCart productId={product.id} />
                </div>
                {product.stock < 10 && (
                  <p className="text-red-600 text-sm">
                    Only {product.stock} items left in stock!
                  </p>
                )}
              </div>

              {/* Shipping Info */}
              {product.shipping && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    {product.shipping.free ? 'Free shipping' : 'Standard shipping'} • 
                    Estimated delivery in {product.shipping.estimatedDays} business days
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="mt-12 border-t pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Features */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Product Features</h3>
                <div className="space-y-2">
                  {product.features?.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.specifications?.map((spec, index) => (
                    <div key={index} className="space-y-1">
                      <dt className="text-sm text-gray-600">{spec.name}</dt>
                      <dd className="font-medium">{spec.value}</dd>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 