import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '../../../../lib/mongodb';
import User from '../../../../lib/models/User';
import Product from '../../../../lib/models/Product';
import Order from '../../../../lib/models/Order';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    // Get total users (excluding admins)
    const totalUsers = await User.countDocuments({ role: { $ne: 'admin' } });

    // Get total products
    const totalProducts = await Product.countDocuments();

    // Get total orders
    const totalOrders = await Order.countDocuments();

    // Get total suppliers
    const totalSuppliers = await User.countDocuments({ role: 'supplier' });

    // Calculate total revenue
    const revenueResult = await Order.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    // Get pending orders
    const pendingOrders = await Order.countDocuments({ status: 'pending' });

    // Get low stock items
    const lowStockItems = await Product.countDocuments({
      stock: { $lte: '$lowStockThreshold' }
    });

    // Get active suppliers
    const activeSuppliers = await User.countDocuments({
      role: 'supplier',
      isActive: true
    });

    return NextResponse.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalSuppliers,
      totalRevenue,
      pendingOrders,
      lowStockItems,
      activeSuppliers
    });
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard metrics' },
      { status: 500 }
    );
  }
} 