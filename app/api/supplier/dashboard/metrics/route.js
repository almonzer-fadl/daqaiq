import { connectToDatabase } from '../../../../lib/mongodb';
import Product from '../../../../lib/models/Product';
import Order from '../../../../lib/models/Order';

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

    // Get supplier's products and orders
    const products = await Product.find({ supplier: session.user.id });
    const orders = await Order.find({ supplier: session.user.id });

    // Calculate key metrics
    const totalProducts = products.length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    // Calculate low stock products
    const lowStockProducts = products.filter(product => 
      product.stock <= product.lowStockThreshold
    ).length;

    // Get recent orders
    const recentOrders = await Order.find({ supplier: session.user.id })
      .sort({ createdAt: -1 })
      .limit(5);

    // Calculate order status counts
    const orderStatusCounts = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    return NextResponse.json({
      metrics: {
        totalProducts,
        totalOrders,
        totalRevenue,
        lowStockProducts,
        recentOrders,
        orderStatusCounts
      }
    });

  } catch (error) {
    console.error('Error fetching supplier metrics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 