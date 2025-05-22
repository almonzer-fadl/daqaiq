import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import Supplier from '@/models/Supplier';
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
export async function GET(req, { params }) {
  try {
    const token = await getToken({ req });

    if (!token || token.role !== 'supplier') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const product = await Product.findOne({
      _id: params.id,
      supplierId: token.id
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Product details error:', error);
    return NextResponse.json(
      { error: 'Error fetching product details' },
      { status: 500 }
    );
  }
}

// PUT handler
export async function PUT(req, { params }) {
  try {
    const token = await getToken({ req });

    if (!token || token.role !== 'supplier') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const formData = await req.formData();
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

    const product = await Product.findOneAndUpdate(
      { _id: params.id, supplierId: token.id },
      { $set: { ...updates, updatedAt: new Date() } },
      { new: true }
    );

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { error: 'Error updating product' },
      { status: 500 }
    );
  }
}

// DELETE handler
export async function DELETE(req, { params }) {
  try {
    const token = await getToken({ req });

    if (!token || token.role !== 'supplier') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const product = await Product.findOneAndDelete({
      _id: params.id,
      supplierId: token.id
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Update supplier stats
    await Supplier.findByIdAndUpdate(token.id, {
      $inc: { 'stats.totalProducts': -1 }
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { error: 'Error deleting product' },
      { status: 500 }
    );
  }
} 