import { connectToDatabase } from '../mongodb';
import Category from '../models/Category';

const sampleCategories = [
  {
    name: 'Filters',
    description: 'All types of automotive filters',
    image: '/images/categories/filters.jpg',
    slug: 'filters',
  },
  {
    name: 'Brakes',
    description: 'Brake system components',
    image: '/images/categories/brakes.jpg',
    slug: 'brakes',
  },
  {
    name: 'Engine Parts',
    description: 'Internal and external engine components',
    image: '/images/categories/engine-parts.jpg',
    slug: 'engine-parts',
  },
  // Add more categories as needed
];

export async function seedCategories() {
  try {
    await connectToDatabase();

    // Clear existing categories
    await Category.deleteMany({});

    // Insert sample categories
    await Category.insertMany(sampleCategories);

    console.log('Categories seeded successfully');
  } catch (error) {
    console.error('Error seeding categories:', error);
    throw error;
  }
} 