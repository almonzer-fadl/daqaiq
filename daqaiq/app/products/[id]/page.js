import { getProductById } from '../../lib/data';
import Image from 'next/image';
import ButtonAddToCart from '../../components/buttons/ButtonAddToCart';
import ButtonQuantitySelector from '../../components/buttons/ButtonQuantitySelector';
import { notFound } from 'next/navigation';
import Link from 'next/link';

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
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="container mx-auto px-4 py-2 text-sm">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="text-gray-500 hover:text-primary">Home</Link>
          </li>
          <li>
            <span className="text-gray-400 mx-2">/</span>
          </li>
          <li>
            <Link href="/products" className="text-gray-500 hover:text-primary">Products</Link>
          </li>
          <li>
            <span className="text-gray-400 mx-2">/</span>
          </li>
          <li className="text-gray-900 font-medium truncate">{product.name}</li>
        </ol>
      </nav>

      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Images */}
          <div className="lg:w-[65%] space-y-4">
            <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden bg-gray-50">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 65vw"
                priority
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.images.slice(1).map((image, index) => (
                <div key={index} className="relative aspect-square rounded-md overflow-hidden bg-gray-50 border hover:border-primary cursor-pointer transition-colors">
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 2}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 20vw, 13vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info - Sticky */}
          <div className="lg:w-[35%]">
            <div className="sticky top-4 space-y-6">
              {/* Brand and Title */}
              <div>
                <Link href={`/brand/${product.brand}`} className="text-primary hover:underline text-sm font-medium">
                  {product.brand}
                </Link>
                <h1 className="text-xl font-medium text-gray-900 mt-1">{product.name}</h1>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-300'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-semibold text-primary">${product.price.toFixed(2)}</span>
                  {product.oldPrice && (
                    <span className="text-lg text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
                  )}
                </div>
                {product.oldPrice && (
                  <div className="inline-block bg-red-50 text-red-600 px-2 py-1 rounded text-sm font-medium">
                    Save {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                  </div>
                )}
              </div>

              {/* Color Selection */}
              {product.colors && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className="w-12 h-12 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary hover:border-primary transition-colors relative group"
                        style={{ backgroundColor: color }}
                        aria-label={`Select ${color} color`}
                      >
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="w-8 h-8 rounded-full border-2 border-white"></div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className="px-4 py-3 border border-gray-200 rounded-md hover:border-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors text-sm font-medium"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <ButtonQuantitySelector maxQuantity={product.stock} />
                  <ButtonAddToCart productId={product.id} className="flex-1" />
                </div>
                {product.stock < 10 && (
                  <p className="text-red-600 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Only {product.stock} items left in stock!
                  </p>
                )}
              </div>

              {/* Shipping Info */}
              {product.shipping && (
                <div className="pt-4 border-t">
                  <div className="flex items-start space-x-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">
                        {product.shipping.free ? 'Free shipping' : 'Standard shipping'}
                      </p>
                      <p>Estimated delivery in {product.shipping.estimatedDays} business days</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mt-16 border-t">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
            {/* Description */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-lg font-medium">Product Description</h3>
              <p className="text-gray-600 whitespace-pre-line">{product.description}</p>
              
              {/* Features */}
              {product.features && (
                <div className="space-y-4">
                  <h4 className="text-base font-medium">Key Features</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-medium mb-6">Specifications</h3>
              <div className="space-y-4">
                {product.specifications?.map((spec, index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                    <dt className="text-sm text-gray-500">{spec.name}</dt>
                    <dd className="text-sm font-medium text-gray-900">{spec.value}</dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 