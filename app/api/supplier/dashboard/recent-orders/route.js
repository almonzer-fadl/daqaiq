import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';

// Add segment config to explicitly mark as dynamic
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req) {
  try {
    const token = await getToken({ req });

    if (!token || token.role !== 'supplier') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const recentOrders = await Order.find({ supplierId: token.id })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('products.productId');

    return NextResponse.json({ orders: recentOrders });
  } catch (error) {
    console.error('Recent orders error:', error);
    return NextResponse.json(
      { error: 'Error fetching recent orders' },
      { status: 500 }
    );
  }
} 