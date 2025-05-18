import { notFound } from 'next/navigation';
import { connectToDatabase } from '@/lib/mongodb';
import Image from 'next/image';
import styles from './ProductDetail.module.css';
import StarRating from '../../components/StarRating';
import { HeartIcon } from '../../components/icons/HeartIcon';
import { DeliveryIcon } from '../../components/icons/DeliveryIcon';

async function getProductBySlug(slug) {
  try {
    const { db } = await connectToDatabase();
    const product = await db.collection('products').findOne({ slug });

    // Convert MongoDB document to a plain object
    if (product) {
      return {
        ...product,
        _id: product._id.toString(), // Convert ObjectId to string
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.'
    };
  }

  return {
    title: product.name,
    description: product.description
  };
}

export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Image Gallery */}
        <div className="lg:w-1/2">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          {/* Ratings Section */}
          <div className="flex items-center gap-4 mb-6">
            <StarRating rating={product.rating || 4.5} />
            <span className="text-gray-600">(50+ reviews)</span>
          </div>

          {/* Price Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4">
              {product.discount && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  {product.discount}% OFF
                </span>
              )}
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary">
                  ${product.price}
                </span>
                {product.oldPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ${product.oldPrice}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-8">
            {product.description}
          </p>

          {/* Actions Section */}
          <div className="flex gap-4 mb-8">
            <div className="flex items-center border rounded-lg">
              <button className="px-4 py-2 text-lg">-</button>
              <input
                type="number"
                defaultValue={1}
                min={1}
                className="w-16 text-center border-x"
              />
              <button className="px-4 py-2 text-lg">+</button>
            </div>
            <button className="btn btn-primary flex-1">
              Add to Cart
            </button>
          </div>

          {/* Additional Info */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600">Category:</span>
                <span className="ml-2">{product.category}</span>
              </div>
              {product.subcategory && (
                <div>
                  <span className="text-gray-600">Subcategory:</span>
                  <span className="ml-2">{product.subcategory}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 