import { connectToDatabase } from '@/lib/mongodb';

export async function getProductBySlug(slug) {
  try {
    const { db } = await connectToDatabase();
    
    const product = await db
      .collection('products')
      .findOne({ slug: slug });
    
    if (!product) {
      return null;
    }

    return product;
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    throw error;
  }
} 