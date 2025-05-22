import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import Supplier from '@/models/Supplier';

// Add segment config to explicitly mark as dynamic
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET endpoint to fetch inventory
export async function GET(req) {
  try {
    const token = await getToken({ req });

    if (!token || token.role !== 'supplier') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const products = await Product.find({ supplierId: token.id })
      .sort({ createdAt: -1 });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Inventory error:', error);
    return NextResponse.json(
      { error: 'Error fetching inventory' },
      { status: 500 }
    );
  }
}

// POST endpoint to update inventory
export async function POST(req) {
  try {
    const token = await getToken({ req });

    if (!token || token.role !== 'supplier') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const data = await req.json();
    data.supplierId = token.id;

    const product = await Product.create(data);

    // Update supplier stats
    await Supplier.findByIdAndUpdate(token.id, {
      $inc: { 'stats.totalProducts': 1 }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { error: 'Error creating product' },
      { status: 500 }
    );
  }
}

// PUT endpoint for bulk inventory updates
export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'supplier') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const { updates } = await request.json();

    if (!Array.isArray(updates)) {
      return NextResponse.json(
        { error: 'Invalid updates format' },
        { status: 400 }
      );
    }

    const results = {
      successful: [],
      failed: []
    };

    for (const update of updates) {
      const { productId, quantity, type, reason, variant } = update;

      try {
        const product = await Product.findOne({
          _id: productId,
          supplier: session.user.id
        });

        if (!product) {
          results.failed.push({
            productId,
            error: 'Product not found'
          });
          continue;
        }

        if (variant) {
          const variantIndex = product.variants.findIndex(v => v.name === variant);
          if (variantIndex === -1) {
            results.failed.push({
              productId,
              error: 'Variant not found'
            });
            continue;
          }

          const oldStock = product.variants[variantIndex].stock;
          if (type === 'increase') {
            product.variants[variantIndex].stock += quantity;
          } else if (type === 'decrease') {
            if (product.variants[variantIndex].stock < quantity) {
              results.failed.push({
                productId,
                error: 'Insufficient stock for variant'
              });
              continue;
            }
            product.variants[variantIndex].stock -= quantity;
          } else if (type === 'adjustment') {
            product.variants[variantIndex].stock = quantity;
          }

          product.stockHistory.push({
            quantity: Math.abs(product.variants[variantIndex].stock - oldStock),
            type,
            reason: `${reason} (Variant: ${variant})`,
            date: new Date()
          });
        } else {
          try {
            product.updateStock(quantity, type, reason);
          } catch (error) {
            results.failed.push({
              productId,
              error: error.message
            });
            continue;
          }
        }

        await product.save();
        results.successful.push({
          productId,
          newStock: variant 
            ? product.variants.find(v => v.name === variant).stock 
            : product.stock
        });

      } catch (error) {
        results.failed.push({
          productId,
          error: error.message
        });
      }
    }

    return NextResponse.json({
      message: 'Bulk update completed',
      results
    });

  } catch (error) {
    console.error('Error performing bulk update:', error);
    return NextResponse.json(
      { error: 'Failed to perform bulk update' },
      { status: 500 }
    );
  }
} 