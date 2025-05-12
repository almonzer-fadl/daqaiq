import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { connectToDatabase } from '../../../../../lib/mongodb';
import Product from '../../../../../lib/models/Product';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'supplier') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const { items } = await request.json();

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Invalid items format' },
        { status: 400 }
      );
    }

    const results = {
      successful: [],
      failed: []
    };

    for (const item of items) {
      try {
        // Validate required fields
        const requiredFields = ['name', 'description', 'price', 'category', 'stock'];
        const missingFields = requiredFields.filter(field => !item[field]);

        if (missingFields.length > 0) {
          results.failed.push({
            name: item.name || 'Unknown',
            error: `Missing required fields: ${missingFields.join(', ')}`
          });
          continue;
        }

        // Create new product
        const product = await Product.create({
          ...item,
          supplier: session.user.id,
          lowStockThreshold: item.lowStockThreshold || 10,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        });

        results.successful.push({
          name: product.name,
          id: product._id,
          stock: product.stock
        });

      } catch (error) {
        results.failed.push({
          name: item.name || 'Unknown',
          error: error.message
        });
      }
    }

    return NextResponse.json({
      message: 'Bulk product creation completed',
      results
    });

  } catch (error) {
    console.error('Error performing bulk product creation:', error);
    return NextResponse.json(
      { error: 'Failed to perform bulk product creation' },
      { status: 500 }
    );
  }
} 