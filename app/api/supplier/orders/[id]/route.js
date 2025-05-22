import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  try {
    const token = await getToken({ req });

    if (!token || token.role !== 'supplier') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const order = await Order.findOne({
      _id: params.id,
      supplierId: token.id
    }).populate('products.productId');

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Order details error:', error);
    return NextResponse.json(
      { error: 'Error fetching order details' },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const token = await getToken({ req });

    if (!token || token.role !== 'supplier') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const data = await req.json();
    const order = await Order.findOneAndUpdate(
      { _id: params.id, supplierId: token.id },
      { $set: data },
      { new: true }
    );

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Update order error:', error);
    return NextResponse.json(
      { error: 'Error updating order' },
      { status: 500 }
    );
  }
} 