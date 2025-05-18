import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/mongodb';
import { Order, Product } from '@/lib/models';
import { authOptions } from '../../../auth/config/auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request, context) {
  try {
    // Connect to database first
    await connectToDatabase();

    // Check authentication and role
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'supplier') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get the order ID from params
    const { params } = context;
    const orderId = params.id;

    // Find the order
    const order = await Order.findOne({
      _id: orderId,
      supplier: session.user.id,
    })
    .populate('customer', 'name email')
    .populate({ 
      path: 'items.product',
      select: 'name price images description'
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order });

  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
} 