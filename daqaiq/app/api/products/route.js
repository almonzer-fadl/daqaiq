import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Product from '../../lib/models/Product';

// Connect to MongoDB
try {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }
  
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));
} catch (error) {
  console.error('MongoDB connection setup error:', error);
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Create new product
    const product = await Product.create(body);
    
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const skip = parseInt(searchParams.get('skip') || '0', 10);
    
    console.log('Checking database connection...');
    console.log('Database name:', mongoose.connection.name);
    console.log('Database host:', mongoose.connection.host);
    console.log('Connection state:', mongoose.connection.readyState);
    
    let query = {};
    
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    if (featured) query.isFeatured = featured === 'true';
    
    console.log('Attempting to count documents...');
    const totalCount = await Product.countDocuments(query);
    console.log('Total products found:', totalCount);
    
    console.log('Attempting to fetch products...');
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    console.log('Products retrieved:', products.length);
    
    if (products.length > 0) {
      console.log('First product:', JSON.stringify(products[0], null, 2));
    } else {
      console.log('No products found in database');
      
      // List all collections in the database
      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log('Available collections:', collections.map(c => c.name));
    }
    
    return NextResponse.json({
      products,
      pagination: {
        total: totalCount,
        limit,
        skip,
        hasMore: skip + limit < totalCount
      }
    });
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
 