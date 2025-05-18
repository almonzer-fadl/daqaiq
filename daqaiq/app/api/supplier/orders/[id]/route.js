import { connectToDatabase } from '@/lib/mongodb';
import { Order, Product } from '@/lib/models';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    await connectToDatabase();

    const order = await Order.findById(params.id)
      .populate('user', 'name email')
      .populate('items.product');

    if (!order) {
      return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404 });
    }

    // Check if the supplier owns any products in this order
    const hasSupplierProducts = order.items.some(item => 
      item.product.supplier.toString() === session.user.id
    );

    if (!hasSupplierProducts) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    return new Response(JSON.stringify(order), { status: 200 });
  } catch (error) {
    console.error('Get order error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function PATCH(request, context) {
  try {
    // Connect to database first
    await connectToDatabase();

    // Check authentication and role
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    if (session.user.role !== 'supplier') {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
    }

    // Get the order ID from params
    const { params } = context;
    const orderId = await params.id;

    // Get the new status from request body
    const { status } = await request.json();

    // Validate status
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return new Response(JSON.stringify({ error: 'Invalid status' }), { status: 400 });
    }

    // Find and update the order
    const order = await Order.findOneAndUpdate(
      {
        _id: orderId,
        supplier: session.user.id,
      },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      },
      { new: true }
    )
    .populate('customer', 'name email')
    .populate({
      path: 'items.product',
      select: 'name price images description'
    });

    if (!order) {
      return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(order), { status: 200 });

  } catch (error) {
    console.error('Error updating order:', error);
    return new Response(JSON.stringify({ error: 'Failed to update order' }), { status: 500 });
  }
} 