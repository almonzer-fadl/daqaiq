import { notFound } from 'next/navigation';
import { connectToDatabase } from '@/lib/mongodb'; // Ensure this is the correct import
import Product from '@/lib/models/Product'; // Import your Product model
import ProductDetail from '../../components/ProductDetail';

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

  return <ProductDetail product={product} />;
} 