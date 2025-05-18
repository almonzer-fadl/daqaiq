import { connectToDatabase } from '@/lib/mongodb';
import { Product, Order } from '@/lib/models';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    await connectToDatabase();

    // Get total products
    const totalProducts = await Product.countDocuments({ supplier: session.user.id });

    // Get total orders
    const totalOrders = await Order.countDocuments({
      'items.product': { 
        $in: await Product.find({ supplier: session.user.id }).distinct('_id') 
      }
    });

    // Get total revenue
    const orders = await Order.find({
      'items.product': { 
        $in: await Product.find({ supplier: session.user.id }).distinct('_id') 
      },
      status: { $in: ['delivered', 'shipped'] }
    });
    
    const totalRevenue = orders.reduce((acc, order) => {
      const supplierItems = order.items.filter(item => 
        item.product.supplier.toString() === session.user.id
      );
      return acc + supplierItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, 0);

    return new Response(JSON.stringify({
      totalProducts,
      totalOrders,
      totalRevenue
    }), { status: 200 });
  } catch (error) {
    console.error('Dashboard metrics error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
} 