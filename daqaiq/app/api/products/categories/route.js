import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { connectToDatabase } from '../../../../../lib/mongodb';
import Product from '../../../../../lib/models/Product';
import Category from '../../../../../lib/models/Category';

// Add segment config to explicitly mark as dynamic
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    // Get all active categories
    const categories = await Category.find({ isActive: true })
      .sort({ order: 1, name: 1 })
      .lean();

    // Get product counts for each category
    const categoryStats = await Product.aggregate([
      {
        $group: {
          _id: '$categorySlug',
          count: { $sum: 1 },
          subcategories: { $addToSet: '$subcategorySlug' }
        }
      }
    ]);

    // Create a map of category stats
    const statsMap = categoryStats.reduce((acc, stat) => {
      acc[stat._id] = {
        count: stat.count,
        subcategories: stat.subcategories.filter(Boolean)
      };
      return acc;
    }, {});

    // Combine categories with their stats
    const categoriesWithStats = categories.map(category => ({
      ...category,
      productCount: statsMap[category.slug]?.count || 0,
      subcategories: statsMap[category.slug]?.subcategories || []
    }));

    return NextResponse.json(categoriesWithStats);
  } catch (error) {
    console.error('Error fetching product categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product categories' },
      { status: 500 }
    );
  }
} 