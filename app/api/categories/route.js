import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Category from '@/lib/models/Category';

// Add segment config to explicitly mark as dynamic
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find({});

    // Convert ObjectId to string
    const formattedCategories = categories.map(category => ({
      ...category.toObject(),
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