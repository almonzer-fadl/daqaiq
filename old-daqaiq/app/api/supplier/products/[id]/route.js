import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '../../../../../lib/mongodb';
import Product from '../../../../../lib/models/Product';
import { authOptions } from '../../../auth/config/auth';
import { unlink, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

// Add segment config to explicitly mark as dynamic
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Helper function to process uploaded file
async function processUploadedFile(file) {
  if (!file || !(file instanceof Blob)) {
    return null;
  }
  
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString('base64');
    const mimeType = file.type;
    return `data:${mimeType};base64,${base64Data}`;
  } catch (error) {
    console.error('Error processing file:', error);
    return null;
  }
}

// GET handler
export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'supplier') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const product = await Product.findOne({
      _id: params.id,
      supplier: session.user.id
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT handler
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'supplier') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const updates = {};

    // Process basic fields
    ['name', 'description', 'category', 'status'].forEach(field => {
      const value = formData.get(field);
      if (value !== null && value !== undefined) {
        updates[field] = value;
      }
    });

    // Process numeric fields
    ['price', 'stock'].forEach(field => {
      const value = formData.get(field);
      if (value !== null && value !== undefined) {
        updates[field] = Number(value);
      }
    });

    // Process main image
    const mainImage = formData.get('image');
    if (mainImage) {
      const processedImage = await processUploadedFile(mainImage);
      if (processedImage) {
        updates.image = processedImage;
      }
    }

    // Process additional images
    const additionalImages = formData.getAll('additionalImages');
    if (additionalImages.length > 0) {
      const processedImages = await Promise.all(
        additionalImages.map(processUploadedFile)
      );
      updates.additionalImages = processedImages.filter(Boolean);
    }

    await connectToDatabase();
    const product = await Product.findOneAndUpdate(
      {
        _id: params.id,
        supplier: session.user.id
      },
      {
        $set: {
          ...updates,
          updatedAt: new Date()
        }
      },
      { new: true }
    );

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE handler
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'supplier') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const product = await Product.findOneAndDelete({
      _id: params.id,
      supplier: session.user.id
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
} 