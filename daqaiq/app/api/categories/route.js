import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../lib/mongodb';

// Add segment config to explicitly mark as dynamic
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const categories = await db.collection('categories').find({}).toArray();

    // Convert ObjectId to string
    const formattedCategories = categories.map(category => ({
      ...category,
      _id: category._id.toString(),
    }));

    return NextResponse.json(formattedCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
} 