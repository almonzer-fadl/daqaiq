import Image from 'next/image';
import Link from 'next/link';
import { carProducts } from '../data/productData';

export default function SectionProductGrid({ startRow, numRows }) {
  // Calculate the start and end indices for the products to display
  const productsPerRow = 4;
  const startIndex = startRow * productsPerRow;
  const endIndex = (startRow + numRows) * productsPerRow;
  
  // Get all products as a flat array
  const allProducts = Object.values(carProducts).flat();
  const displayProducts = allProducts.slice(startIndex, endIndex);

  if (!displayProducts.length) return null;

  return (
    <div className="my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayProducts.map((product, index) => (
          <Link 
            href={`/products/${product.slug}`}
            key={index}
            className="group"
          >
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all h-full">
              <figure className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                    {product.discount}% OFF
                  </div>
                )}
              </figure>
              <div className="card-body p-4">
                <h3 className="card-title text-lg group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                <div className="card-actions justify-between items-center mt-4">
                  <div className="flex flex-col">
                    {product.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.oldPrice}
                      </span>
                    )}
                    <span className="text-lg font-bold text-primary">
                      ${product.price}
                    </span>
                  </div>
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