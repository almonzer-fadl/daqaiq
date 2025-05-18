import Image from 'next/image';
import Link from 'next/link';

export default function ProductGridSection({ products, title }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-600">No products found in this category</h2>
      </div>
    );
  }

  return (
    <section className="py-12">
      {title && (
        <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
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
                {product.isNew && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm">
                    NEW
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
    </section>
  );
} 