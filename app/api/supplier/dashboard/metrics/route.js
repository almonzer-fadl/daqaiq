import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import dbConnect from '@/lib/dbConnect';
import Supplier from '@/models/Supplier';
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

    // Get supplier data
    const supplier = await Supplier.findById(token.id);
    if (!supplier) {
      return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
    }

    // Get orders metrics
    const [pendingOrders, completedOrders, totalOrders] = await Promise.all([
      Order.countDocuments({ supplierId: supplier._id, status: 'pending' }),
      Order.find({ supplierId: supplier._id, status: 'delivered' }),
      Order.countDocuments({ supplierId: supplier._id })
    ]);

    // Calculate revenue from completed orders
    const revenue = completedOrders.reduce((total, order) => total + (order.totalAmount || 0), 0);

    // Get or set default stats
    const stats = {
      totalOrders: totalOrders || 0,
      totalProducts: supplier.stats?.totalProducts || 0,
      rating: supplier.stats?.rating || 0,
      reviewCount: supplier.stats?.reviewCount || 0,
      pendingOrders: pendingOrders || 0,
      revenue: revenue || 0
    };

    // Update supplier stats if they've changed
    if (stats.totalOrders !== supplier.stats?.totalOrders) {
      await Supplier.findByIdAndUpdate(supplier._id, {
        'stats.totalOrders': stats.totalOrders
      });
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Metrics error:', error);
    return NextResponse.json(
      { error: 'Error fetching metrics' },
      { status: 500 }
    );
  }
} 