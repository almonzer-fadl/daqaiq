import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '../../../../../lib/mongodb';
import Order from '../../../../../lib/lib/models/Order';
import Product from '../../../../../lib/lib/models/Product';
import { authOptions } from '../../../auth/[...nextauth]/route';

export async function GET(request, context) {
  try {
    // Connect to database first
    await connectToDatabase();

    // Check authentication and role
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'supplier') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get the order ID from params
    const { params } = context;
    const orderId = await params.id;

    // Find the order
    const order = await Order.findOne({
      _id: orderId,
      supplier: session.user.id,
    })
    .populate('customer', 'name email')
    .populate({ 
      path: 'items.product',
      select: 'name price images description'
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order });

  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, context) {
  try {
    // Connect to database first
    await connectToDatabase();

    // Check authentication and role
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'supplier') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get the order ID from params
    const { params } = context;
    const orderId = await params.id;

    // Get the new status from request body
    const { status } = await request.json();

    // Validate status
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
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
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order });

  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
} 