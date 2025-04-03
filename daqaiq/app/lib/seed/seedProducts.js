import { connectToDatabase } from '../mongodb';
import { products } from './products.js';

export async function seedProducts() {
  try {
    const { db } = await connectToDatabase();
    
    // Delete existing products
    console.log('Deleting existing products...');
    await db.collection('products').deleteMany({});
    
    // Insert new products
    console.log('Inserting new products...');
    const result = await db.collection('products').insertMany(products);
    
    console.log(`Successfully seeded ${result.insertedCount} products`);
    return { success: true, count: result.insertedCount };
  } catch (error) {
    console.error('Error seeding products:', error);
    return { success: false, error: error.message };
  }
} 