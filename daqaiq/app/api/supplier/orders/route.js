import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { connectToDatabase } from '../../../../../lib/mongodb';
import Order from '../../../../lib/lib/models/Order';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    // Check authentication and role
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'supplier') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 10; // Number of orders per page

    // Connect to database
    await connectToDatabase();

    // Build query
    const query = { supplier: session.user.id };
    if (status && status !== 'all') {
      query.status = status;
    }

    // Get total count for pagination
    const total = await Order.countDocuments(query);

    // Fetch orders with pagination
    const orders = await Order.find(query)
      .populate('customer', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      orders,
      hasMore: total > page * limit,
      total,
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { message: 'Error fetching orders', error: error.message },
      { status: 500 }
    );
  }
} 