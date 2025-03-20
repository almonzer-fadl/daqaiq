import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '../../../lib/mongodb';
import Product from '../../../lib/models/Product';
import { authOptions } from '../../auth/[...nextauth]/route';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    // Check authentication and role
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'supplier') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    // Get form data
    const formData = await req.formData();
    const productData = {};

    // Extract product data
    for (const [key, value] of formData.entries()) {
      if (key === 'images') continue;
      if (key === 'variants' || key === 'specifications') {
        productData[key] = JSON.parse(value);
      } else {
        productData[key] = value;
      }
    }

    // Process tags
    if (productData.tags) {
      productData.tags = productData.tags.split(',').map(tag => tag.trim());
    }

    // Handle image uploads
    const images = formData.getAll('images');
    const imageUrls = [];

    for (const image of images) {
      if (typeof image === 'object' && 'arrayBuffer' in image) {
        const buffer = Buffer.from(await image.arrayBuffer());
        const filename = `${uuidv4()}_${image.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        const relativePath = `/uploads/products/${filename}`;
        const fullPath = path.join(process.cwd(), 'public', relativePath);

        // Ensure directory exists
        await writeFile(fullPath, buffer);
        imageUrls.push(relativePath);
      }
    }

    // Add additional fields
    productData.images = imageUrls;
    productData.supplier = session.user.id;
    productData.createdAt = new Date();
    productData.updatedAt = new Date();

    // Connect to database
    await connectToDatabase();

    // Create product
    const product = await Product.create(productData);

    return NextResponse.json({
      message: 'Product created successfully',
      product: product
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { message: 'Error creating product', error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    // Check authentication and role
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'supplier') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    // Connect to database
    await connectToDatabase();

    // Get supplier's products
    const products = await Product.find({ supplier: session.user.id })
      .sort({ createdAt: -1 });

    return NextResponse.json({ products });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'Error fetching products', error: error.message },
      { status: 500 }
    );
  }
} 