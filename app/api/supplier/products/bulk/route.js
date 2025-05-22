import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import Supplier from '@/models/Supplier';

// Add segment config to explicitly mark as dynamic
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const token = await getToken({ req });

    if (!token || token.role !== 'supplier') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { products } = await req.json();

    if (!Array.isArray(products)) {
      return NextResponse.json(
        { error: 'Invalid products format' },
        { status: 400 }
      );
    }

    const results = {
      successful: [],
      failed: []
    };

    // Add supplier ID to each product
    const productsWithSupplierId = products.map(product => ({
      ...product,
      supplierId: token.id
    }));

    // Create products in bulk
    const createdProducts = await Product.insertMany(productsWithSupplierId, {
      ordered: false
    }).catch(error => {
      if (error.writeErrors) {
        // Handle partial success
        results.failed = error.writeErrors.map(err => ({
          index: err.index,
          error: err.errmsg
        }));
        return error.insertedDocs;
      }
      throw error;
    });

    if (createdProducts) {
      results.successful = createdProducts.map(product => ({
        _id: product._id,
        name: product.name
      }));

      // Update supplier stats
      await Supplier.findByIdAndUpdate(token.id, {
        $inc: { 'stats.totalProducts': createdProducts.length }
      });
    }

    return NextResponse.json({
      message: 'Bulk create completed',
      results
    });
  } catch (error) {
    console.error('Bulk create error:', error);
    return NextResponse.json(
      { error: 'Error creating products' },
      { status: 500 }
    );
  }
} 