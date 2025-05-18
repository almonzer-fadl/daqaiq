import { connectToDatabase } from '../mongodb';
import { Product, Category, User } from '../models';

export async function seedProducts() {
  try {
    await connectToDatabase();

    // Get a supplier user
    const supplier = await User.findOne({ role: 'supplier' });
    if (!supplier) {
      throw new Error('No supplier found. Please create a supplier first.');
    }

    // Get or create categories
    const categories = await Promise.all([
      Category.findOneAndUpdate(
        { slug: 'car-parts' },
        {
          name: 'Car Parts',
          slug: 'car-parts',
          description: 'Essential car parts and components',
          isActive: true
        },
        { upsert: true, new: true }
      ),
      Category.findOneAndUpdate(
        { slug: 'accessories' },
        {
          name: 'Accessories',
          slug: 'accessories',
          description: 'Car accessories and enhancements',
          isActive: true
        },
        { upsert: true, new: true }
      )
    ]);

    // Sample products data
    const productsData = [
      {
        name: 'Premium Brake Kit',
        slug: 'premium-brake-kit',
        description: 'High-performance brake kit with ceramic pads',
        price: 299.99,
        compareAtPrice: 349.99,
        images: ['/images/products/brake-kit.jpg'],
        category: categories[0]._id,
        supplier: supplier._id,
        stock: 50,
        isActive: true,
        isFeatured: true
      },
      {
        name: 'LED Headlight Set',
        slug: 'led-headlight-set',
        description: 'Ultra-bright LED headlight conversion kit',
        price: 199.99,
        compareAtPrice: 249.99,
        images: ['/images/products/headlight.jpg'],
        category: categories[1]._id,
        supplier: supplier._id,
        stock: 30,
        isActive: true,
        isFeatured: true
      }
    ];

    // Insert products
    await Product.deleteMany({}); // Clear existing products
    const products = await Product.insertMany(productsData);

    return {
      success: true,
      message: `Successfully seeded ${products.length} products`,
      products
    };
  } catch (error) {
    console.error('Seed products error:', error);
    throw error;
  }
} 