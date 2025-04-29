import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Order from '../../../lib/models/Order';
import User from '../../../lib/models/User';
import Product from '../../../lib/models/Product';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST() {
  try {
    console.log('Connecting to database...');
    await connectToDatabase();
    console.log('Connected to database successfully');

    // Get the current supplier from the session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'supplier') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Find a customer
    console.log('Finding customer...');
    const customer = await User.findOne({ role: 'customer' });
    console.log('Customer found:', !!customer);

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Find a product from this supplier
    console.log('Finding product for supplier...');
    const product = await Product.findOne({ supplier: session.user.id });
    console.log('Product found:', !!product);

    if (!product) {
      return NextResponse.json(
        { error: 'No products found for supplier' },
        { status: 404 }
      );
    }

    console.log('Creating test order...');
    // Create a test order
    const testOrder = new Order({
      orderNumber: 'TEST-' + Date.now(),
      customer: customer._id,
      supplier: session.user.id,
      items: [
        {
          product: product._id,
          quantity: 2,
          price: product.price,
          variant: product.variants?.[0] || null
        }
      ],
      status: 'pending',
      shippingAddress: {
        fullName: 'Test Customer',
        addressLine1: '123 Test Street',
        city: 'Test City',
        state: 'Test State',
        postalCode: '12345',
        country: 'Test Country',
        phone: '+1234567890'
      },
      subtotal: product.price * 2,
      shippingCost: 10,
      tax: (product.price * 2) * 0.15,
      total: (product.price * 2) + 10 + ((product.price * 2) * 0.15),
      currency: 'SAR'
    });

    console.log('Saving test order...');
    await testOrder.save();
    console.log('Test order saved successfully');

    return NextResponse.json({ 
      message: 'Test order created successfully',
      order: testOrder 
    });

  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { error: 'Failed to create test order', details: error.message },
      { status: 500 }
    );
  }
} 