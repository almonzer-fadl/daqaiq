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

    const supplier = await Supplier.findById(token.id);
    if (!supplier) {
      return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
    }

    // Get pending orders count
    const pendingOrders = await Order.countDocuments({
      supplier: supplier._id,
      status: 'pending'
    });

    // Calculate total revenue
    const orders = await Order.find({
      supplier: supplier._id,
      status: 'completed'
    });
    
    const revenue = orders.reduce((total, order) => total + order.totalAmount, 0);

    // Return dashboard metrics
    return NextResponse.json({
      totalOrders: supplier.stats.totalOrders,
      totalProducts: supplier.stats.totalProducts,
      rating: supplier.stats.rating,
      reviewCount: supplier.stats.reviewCount,
      pendingOrders,
      revenue
    });
  } catch (error) {
    console.error('Metrics error:', error);
    return NextResponse.json(
      { error: 'Error fetching metrics' },
      { status: 500 }
    );
  }
} 