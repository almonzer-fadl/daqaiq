import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '../../../../lib/mongodb';
import Product from '../../../../lib/models/Product';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { unlink, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Ensure uploads directory exists
async function ensureUploadDir() {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products');
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

export async function DELETE(request, context) {
  try {
    // Check authentication and role
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'supplier') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    // Get the ID from params
    const params = await context.params;
    const { id } = params;

    // Connect to database
    await connectToDatabase();

    // Find the product
    const product = await Product.findOne({
      _id: id,
      supplier: session.user.id,
    });

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    // Delete product images from filesystem
    if (product.images && product.images.length > 0) {
      for (const imageUrl of product.images) {
        try {
          const imagePath = path.join(process.cwd(), 'public', imageUrl);
          await unlink(imagePath);
        } catch (error) {
          console.error('Error deleting image file:', error);
          // Continue with deletion even if image file deletion fails
        }
      }
    }

    // Delete the product
    await Product.deleteOne({ _id: id });

    return NextResponse.json({ message: 'Product deleted successfully' });

  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { message: 'Error deleting product', error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request, context) {
  try {
    // Check authentication and role
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'supplier') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    // Get the ID from params
    const params = await context.params;
    const { id } = params;

    // Connect to database
    await connectToDatabase();

    // Find the product
    const product = await Product.findOne({
      _id: id,
      supplier: session.user.id,
    });

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product });

  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { message: 'Error fetching product', error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'supplier') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const productId = params.id;
    
    // Create a basic updates object for fields other than images
    const updates = {};
    
    // Process basic text fields
    ['name', 'description', 'status', 'category'].forEach(field => {
      if (formData.has(field)) {
        updates[field] = formData.get(field);
      }
    });
    
    // Process numeric fields
    ['price', 'quantity', 'stock'].forEach(field => {
      if (formData.has(field) && formData.get(field) !== '') {
        updates[field] = Number(formData.get(field));
      }
    });
    
    // Process main image if uploaded
    const mainImage = formData.get('image');
    if (mainImage && mainImage instanceof Blob) {
      const arrayBuffer = await mainImage.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Image = buffer.toString('base64');
      const mimeType = mainImage.type;
      updates.image = `data:${mimeType};base64,${base64Image}`;
    }
    
    // Process additional images if uploaded
    const additionalImageFiles = formData.getAll('additionalImages');
    if (additionalImageFiles.length > 0) {
      const additionalImages = [];
      
      for (const file of additionalImageFiles) {
        if (file instanceof Blob) {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const base64Image = buffer.toString('base64');
          const mimeType = file.type;
          additionalImages.push(`data:${mimeType};base64,${base64Image}`);
        }
      }
      
      if (additionalImages.length > 0) {
        updates.additionalImages = additionalImages;
      }
    }
    
    await connectToDatabase();
    
    // Find the existing product first
    const existingProduct = await Product.findOne({ 
      _id: productId, 
      supplier: session.user.id 
    });
    
    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found or not owned by this supplier' },
        { status: 404 }
      );
    }
    
    // If no new stock/quantity was provided, keep the existing one
    if (!updates.hasOwnProperty('stock') && !updates.hasOwnProperty('quantity')) {
      updates.stock = existingProduct.stock;
    } else if (updates.hasOwnProperty('quantity')) {
      updates.stock = updates.quantity;
      delete updates.quantity;
    }
    
    // If no new main image was uploaded, keep the existing one
    if (!updates.image) {
      updates.image = existingProduct.image;
    }
    
    // If no new additional images were uploaded, keep the existing ones
    if (!updates.additionalImages) {
      updates.additionalImages = existingProduct.additionalImages || [];
    }
    
    // Update the product
    const product = await Product.findOneAndUpdate(
      { _id: productId, supplier: session.user.id },
      { $set: updates },
      { new: true, runValidators: true }
    );
    
    return NextResponse.json({ 
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
} 