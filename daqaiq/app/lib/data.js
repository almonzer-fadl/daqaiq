import { connectToDatabase } from './mongodb';
import { ObjectId } from 'mongodb';

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

export async function getProductById(id) {
  try {
    const { db } = await connectToDatabase();
    let query = {};
    
    // Check if the id is a valid ObjectId
    if (ObjectId.isValid(id)) {
      query._id = new ObjectId(id);
    } else {
      // If not a valid ObjectId, try to find by string id
      query.id = id;
    }
    
    const product = await db.collection('products').findOne(query);
    
    if (!product) {
      // Fallback to static data for development
      const staticProducts = {
        '1': {
          id: '1',
          name: 'U.S. Polo Assn. Navy Blue Shoulder Bag',
          brand: 'U.S. Polo Assn.',
          price: 49.99,
          oldPrice: 79.99,
          description: 'Elegant navy blue shoulder bag with claret red accents. Perfect for everyday use with spacious compartments and durable material.',
          images: [
            '/images/products/placeholder.svg',
            '/images/products/placeholder.svg',
            '/images/products/placeholder.svg',
            '/images/products/placeholder.svg',
          ],
          colors: ['#000080', '#DC143C', '#000000'],
          sizes: ['S', 'M', 'L'],
          features: [
            'High-quality synthetic leather',
            'Adjustable shoulder strap',
            'Multiple compartments',
            'Metal hardware details',
            'Zipper closure',
          ],
          specifications: [
            { name: 'Material', value: 'Synthetic Leather' },
            { name: 'Dimensions', value: '30 x 20 x 10 cm' },
            { name: 'Weight', value: '500g' },
            { name: 'Warranty', value: '2 Years' }
          ],
          stock: 50,
          rating: 4.5,
          reviewCount: 128,
          shipping: {
            free: true,
            estimatedDays: '2-4'
          }
        }
      };
      
      return staticProducts[id] || null;
    }

    return {
      id: product._id.toString(),
      name: product.name,
      brand: product.brand,
      price: product.price,
      oldPrice: product.originalPrice,
      description: product.description,
      images: product.images || ['/images/products/placeholder.svg'],
      colors: product.colors || [],
      sizes: product.sizes || [],
      features: product.features || [],
      specifications: product.specifications || [],
      stock: product.stock || 0,
      rating: product.rating || 0,
      reviewCount: product.reviewCount || 0,
      shipping: product.shipping || {
        free: false,
        estimatedDays: '3-5'
      }
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
} 