import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { connectToDatabase } from '../../../../lib/mongodb';
import Product from '../../../../lib/models/Product';
import Order from '../../../../lib/models/Order';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'supplier') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    // Get total products
    const totalProducts = await Product.countDocuments({ supplier: session.user.id });

    // Get active orders
    const activeOrders = await Order.countDocuments({
      supplier: session.user.id,
      status: { $in: ['pending', 'processing'] }
    });

    // Calculate monthly revenue
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlyRevenue = await Order.aggregate([
      {
        $match: {
          supplier: session.user.id,
          status: 'completed',
          createdAt: { $gte: startOfMonth }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total' }
        }
      }
    ]).then(result => (result[0]?.total || 0));

    // Calculate total inventory value
    const inventoryValue = await Product.aggregate([
      {
        $match: { supplier: session.user.id }
      },
      {
        $group: {
          _id: null,
          total: { $sum: { $multiply: ['$price', '$stock'] } }
        }
      }
    ]).then(result => (result[0]?.total || 0));

    return NextResponse.json({
      totalProducts,
      activeOrders,
      monthlyRevenue,
      inventoryValue
    });
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 