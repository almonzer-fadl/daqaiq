import { connectToDatabase } from '../mongodb';
import { User } from '../models';
import { seedProducts } from './seedProducts';
import { seedCategories } from './seedCategories';

export async function seedDatabase() {
  try {
    await connectToDatabase();

    // Clear existing data
    await User.deleteMany({});

    // Seed data
    await seedCategories();
    await seedProducts();

    return { message: 'Database seeded successfully' };
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
} 