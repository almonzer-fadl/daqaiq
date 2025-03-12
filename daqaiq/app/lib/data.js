import { connectToDatabase } from '@/app/lib/mongodb';

export async function getCategoryProducts(categorySlug) {
  const { db } = await connectToDatabase();
  const products = await db
    .collection('products')
    .find({ categorySlug })
    .toArray();

  return products.map(product => ({
    _id: product._id.toString(),
    name: product.name,
    slug: product.slug,
    images: product.images,
    price: product.price,
    originalPrice: product.originalPrice,
    discount: product.discount,
    brand: product.brand,
    rating: product.rating,
    reviewCount: product.reviewCount,
  }));
} 