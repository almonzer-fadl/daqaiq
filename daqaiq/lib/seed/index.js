import { seedProducts } from './seedProducts';

export async function seedDatabase() {
  try {
    const productsResult = await seedProducts();
    
    return {
      success: true,
      message: 'Database seeded successfully',
      details: {
        products: productsResult
      }
    };
  } catch (error) {
    console.error('Seed database error:', error);
    throw error;
  }
}

export { seedProducts }; 