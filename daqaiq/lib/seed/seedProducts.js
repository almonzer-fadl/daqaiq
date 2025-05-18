import { connectToDatabase } from '../mongodb';
import Product from '../models/Product';

const sampleProducts = [
  {
    name: 'Oil Filter',
    description: 'High-quality oil filter for optimal engine protection',
    price: 15.99,
    category: 'Filters',
    brand: 'Bosch',
    stockQuantity: 100,
    images: ['/images/products/oil-filter.jpg'],
  },
  {
    name: 'Brake Pads',
    description: 'Premium brake pads for reliable stopping power',
    price: 45.99,
    category: 'Brakes',
    brand: 'Brembo',
    stockQuantity: 50,
    images: ['/images/products/brake-pads.jpg'],
  },
  // Add more sample products as needed
];

export async function seedProducts() {
  try {
    await connectToDatabase();

    // Clear existing products
    await Product.deleteMany({});

    // Insert sample products
    await Product.insertMany(sampleProducts);

    console.log('Products seeded successfully');
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
} 