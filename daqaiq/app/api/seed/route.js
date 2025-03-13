import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../lib/mongodb';
import { sampleProducts } from '../../data/sample-products';
import { categories } from '../../data/categories';

export async function POST() {
  try {
    const { db } = await connectToDatabase();

    // Clear existing data
    await db.collection('products').deleteMany({});
    await db.collection('categories').deleteMany({});

    // Insert categories
    await db.collection('categories').insertMany(categories);

    // Insert products
    await db.collection('products').insertMany(sampleProducts);

    return NextResponse.json({ 
      message: 'Database seeded successfully',
      productsCount: sampleProducts.length,
      categoriesCount: categories.length
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
} 