import { connectToDatabase } from '../../lib/mongodb';
import ProductDetail from '../../components/ProductDetail';
import { notFound } from 'next/navigation';

async function getProductBySlug(slug) {
  try {
    const { db } = await connectToDatabase();
    const product = await db.collection('products').findOne({ slug });
    
    if (!product) {
      return null;
    }
    
    return {
      ...product,
      _id: product._id.toString(),
    };
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
    description: product.description || `${product.name} - Shop now at our store`,
    openGraph: {
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug);
  
  if (!product) {
    notFound();
  }
  
  return <ProductDetail product={product} />;
} 