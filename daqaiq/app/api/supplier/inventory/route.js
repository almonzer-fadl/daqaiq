import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '../../../lib/mongodb';
import Product from '../../../lib/models/Product';
import { authOptions } from '../../auth/[...nextauth]/route';

// GET endpoint to fetch inventory status
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'supplier') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const stockStatus = searchParams.get('stockStatus');
    const category = searchParams.get('category');

    // Build query
    const query = { supplier: session.user.id };
    if (stockStatus) {
      if (stockStatus === 'low_stock') {
        query.stock = { $lte: '$lowStockThreshold' };
      } else if (stockStatus === 'out_of_stock') {
        query.stock = 0;
      }
    }
    if (category) {
      query.category = category;
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const products = await Product.find(query)
      .select('name stock lowStockThreshold category variants stockHistory')
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });

    const total = await Product.countDocuments(query);

    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        hasMore: skip + products.length < total
      }
    });

  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inventory' },
      { status: 500 }
    );
  }
}

// POST endpoint to update inventory
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'supplier') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const { items } = await request.json();

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Invalid items format' },
        { status: 400 }
      );
    }

    const results = {
      successful: [],
      failed: []
    };

    for (const item of items) {
      const { name, quantity, type, reason, variant } = item;

      try {
        // Find product by name for this supplier
        const product = await Product.findOne({
          name: name,
          supplier: session.user.id
        });

        if (!product) {
          results.failed.push({
            name,
            error: 'Product not found'
          });
          continue;
        }

        if (variant) {
          const variantIndex = product.variants.findIndex(v => v.name === variant);
          if (variantIndex === -1) {
            results.failed.push({
              name,
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
                name,
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
              name,
              error: error.message
            });
            continue;
          }
        }

        await product.save();
        results.successful.push({
          name,
          newStock: variant 
            ? product.variants.find(v => v.name === variant).stock 
            : product.stock
        });

      } catch (error) {
        results.failed.push({
          name,
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

// POST endpoint for bulk inventory updates
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