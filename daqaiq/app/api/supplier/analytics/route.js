import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/config/auth';
import { connectToDatabase } from '@/lib/mongodb';
import Product from '../../../../lib/models/Product';
import { Order } from '@/lib/models';

// Add segment config to explicitly mark as dynamic
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'supplier') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    // Fetch analytics data for the supplier
    const orders = await Order.find({ supplier: session.user.id })
      .select('totalAmount createdAt status')
      .sort({ createdAt: -1 });

    const products = await Product.find({ supplier: session.user.id })
      .select('name stock');

    // Calculate total sales and total orders
    const totalSales = orders.reduce((acc, order) => acc + order.totalAmount, 0);
    const totalOrders = orders.length;

    return NextResponse.json({
      totalSales,
      totalOrders,
      products,
      orders,
    });
  } catch (error) {
    console.error('Error fetching supplier analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}