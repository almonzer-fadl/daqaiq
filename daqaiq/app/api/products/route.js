import { connectToDatabase } from '../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('categorySlug');
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    const skip = parseInt(searchParams.get('skip') || '0', 10);
    
    const { db } = await connectToDatabase();
    
    // Build query based on parameters
    const query = {};
    if (categorySlug) {
      query.categorySlug = categorySlug;
    }
    
    // Get total count for pagination
    const totalCount = await db.collection('products').countDocuments(query);
    
    // Get products with pagination
    const products = await db
      .collection('products')
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray();
    
    // Format products to ensure consistent structure
    const formattedProducts = products.map(product => ({
      ...product,
      _id: product._id.toString(), // Convert ObjectId to string
      price: product.price || 0,
      originalPrice: product.originalPrice || product.price,
      discount: product.discount || 0,
      rating: product.rating || 0,
      reviewCount: product.reviewCount || 0,
      images: product.images || []
    }));
    
    return NextResponse.json({
      products: formattedProducts,
      pagination: {
        total: totalCount,
        limit,
        skip,
        hasMore: skip + limit < totalCount
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const product = await request.json();
    
    // Validate required fields
    if (!product.name || !product.slug) {
      return NextResponse.json(
        { error: 'Product name and slug are required' },
        { status: 400 }
      );
    }
    
    const { db } = await connectToDatabase();
    
    // Insert the product
    const result = await db.collection('products').insertOne(product);
    
    return NextResponse.json({
      message: 'Product added successfully',
      productId: result.insertedId.toString()
    });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json(
      { error: 'Failed to add product' },
      { status: 500 }
    );
  }
}
 