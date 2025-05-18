import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { connectToDatabase } from '@/lib/mongodb';
import Category from '@/lib/models/Category';
import Product from '@/lib/models/Product';

// Add segment config to explicitly mark as dynamic
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    await connectToDatabase();

    const categories = await Category.find({ isActive: true })
      .populate('subcategories')
      .sort({ order: 1, name: 1 })
      .lean();

    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.error('Categories fetch error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch categories' }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    await connectToDatabase();

    const category = new Category(data);
    await category.save();

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const category = await Category.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if category has subcategories
    const hasSubcategories = await Category.exists({ parent: id });
    if (hasSubcategories) {
      return NextResponse.json(
        { error: 'Cannot delete category with subcategories' },
        { status: 400 }
      );
    }

    // Check if category has products
    const hasProducts = await Product.exists({ category: id });
    if (hasProducts) {
      return NextResponse.json(
        { error: 'Cannot delete category with products' },
        { status: 400 }
      );
    }

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
} 