import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '../../../../../lib/mongodb';
import Product from '../../../../../lib/models/Product';
import Order from '../../../../lib/models/Order';
import { authOptions } from '../../auth/[...nextauth]/route';

// Add segment config to explicitly mark as dynamic
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    console.log('Analytics API called');
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'supplier') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    console.log('Connected to database');

    // Get query parameters for date range
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30d';
    console.log('Period:', period);

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    switch (period) {
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(startDate.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate.setDate(startDate.getDate() - 30);
    }
    console.log('Date range:', { startDate, endDate });

    // Get inventory metrics
    const inventoryMetrics = await Product.aggregate([
      { $match: { supplier: session.user.id } },
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          totalStock: { $sum: '$stock' },
          lowStockProducts: {
            $sum: {
              $cond: [
                { $lte: ['$stock', '$lowStockThreshold'] },
                1,
                0
              ]
            }
          },
          outOfStockProducts: {
            $sum: {
              $cond: [{ $eq: ['$stock', 0] }, 1, 0]
            }
          }
        }
      }
    ]);

    // Get order metrics
    console.log('Fetching order metrics...');
    const orderMetrics = await Order.aggregate([
      {
        $match: {
          supplier: session.user.id,
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$total' },
          averageOrderValue: { $avg: '$total' }
        }
      }
    ]);
    console.log('Order metrics:', orderMetrics);

    // Get daily sales
    console.log('Fetching daily sales...');
    const dailySales = await Order.aggregate([
      {
        $match: {
          supplier: session.user.id,
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          amount: { $sum: '$total' }
        }
      },
      { $sort: { '_id': 1 } }
    ]);
    console.log('Daily sales:', dailySales);

    // Get top products
    console.log('Fetching top products...');
    const topProducts = await Order.aggregate([
      {
        $match: {
          supplier: session.user.id,
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product',
          totalSales: { $sum: '$items.quantity' },
          revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      { $sort: { totalSales: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $project: {
          name: '$product.name',
          totalSales: 1,
          revenue: 1
        }
      }
    ]);
    console.log('Top products:', topProducts);

    // Get sales by category
    console.log('Fetching sales by category...');
    const salesByCategory = await Order.aggregate([
      {
        $match: {
          supplier: session.user.id,
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.product',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $group: {
          _id: '$product.category',
          revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      {
        $project: {
          name: '$_id',
          revenue: 1,
          _id: 0
        }
      }
    ]);
    console.log('Sales by category:', salesByCategory);

    const response = {
      salesOverview: {
        totalSales: orderMetrics[0]?.totalRevenue || 0,
        monthlyRevenue: orderMetrics[0]?.totalRevenue || 0,
        averageOrderValue: orderMetrics[0]?.averageOrderValue || 0,
        totalOrders: orderMetrics[0]?.totalOrders || 0
      },
      topProducts: topProducts.map(product => ({
        name: product.name,
        totalSales: product.totalSales,
        revenue: product.revenue
      })),
      salesByCategory: salesByCategory.map(category => ({
        name: category.name,
        revenue: category.revenue,
        percentage: (category.revenue / (orderMetrics[0]?.totalRevenue || 1)) * 100
      })),
      recentSales: dailySales.map(sale => ({
        date: sale._id,
        amount: sale.amount
      }))
    };

    console.log('Final response:', response);
    return NextResponse.json(response);

  } catch (error) {
    console.error('Error in analytics API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
} 