import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '../../../lib/mongodb';
import Product from '../../../lib/models/Product';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(req) {
  try {
    // Check authentication and role
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'supplier') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get form data
    const formData = await req.formData();
    const productData = {
      supplier: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Process basic text fields
    ['name', 'description', 'status', 'category'].forEach(field => {
      if (formData.has(field)) {
        productData[field] = formData.get(field);
      }
    });
    
    // Process numeric fields
    ['price', 'quantity'].forEach(field => {
      if (formData.has(field)) {
        productData[field] = Number(formData.get(field));
      }
    });

    // Process main image if uploaded
    const mainImage = formData.get('image');
    if (mainImage && mainImage instanceof Blob) {
      // Convert the image to a data URL for storage
      const arrayBuffer = await mainImage.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Image = buffer.toString('base64');
      const mimeType = mainImage.type;
      productData.image = `data:${mimeType};base64,${base64Image}`;
    }
    
    // Process additional images if uploaded
    const additionalImageFiles = formData.getAll('additionalImages');
    if (additionalImageFiles.length > 0) {
      productData.additionalImages = [];
      
      for (const file of additionalImageFiles) {
        if (file instanceof Blob) {
          // Convert each image to a data URL
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const base64Image = buffer.toString('base64');
          const mimeType = file.type;
          productData.additionalImages.push(`data:${mimeType};base64,${base64Image}`);
        }
      }
    }

    // Connect to database
    await connectToDatabase();

    try {
      // Create product using new instance and save
      const product = new Product(productData);
      console.log('PRODUCT DATA BEFORE SAVE:', product);
      // Validate the product before saving
      const validationError = product.validateSync();
      if (validationError) {
        return NextResponse.json(
          { error: validationError.message },
          { status: 400 }
        );
      }
      await product.save();

      return NextResponse.json({
        message: 'Product created successfully',
        product: product
      }, { status: 201 });
    } catch (error) {
      console.error('Error creating product:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to create product' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    // Check authentication and role
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'supplier') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
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
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
} 