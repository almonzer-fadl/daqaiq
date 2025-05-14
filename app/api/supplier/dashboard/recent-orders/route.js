import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/config/auth';
import { connectToDatabase } from '../../../../../lib/mongodb';
import Order from '../../../../../lib/models/Order';

// Add segment config to explicitly mark as dynamic
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'supplier') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    // Get the 5 most recent orders
    const orders = await Order.find({ supplier: session.user.id })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('customer', 'name email')
      .lean();

    // Format the orders for the frontend
    const formattedOrders = orders.map(order => ({
      id: order._id.toString(),
      customer: order.customer?.name || 'Anonymous',
      amount: order.total,
      status: order.status,
      date: order.createdAt,
    }));

    return NextResponse.json({ orders: formattedOrders });
  } catch (error) {
    console.error('Error fetching recent orders:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 