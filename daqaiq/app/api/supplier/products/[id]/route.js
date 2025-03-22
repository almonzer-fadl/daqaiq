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

export async function PUT(request, context) {
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

    // Get form data
    const formData = await request.formData();
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

    // Handle existing images
    const existingImages = JSON.parse(formData.get('existingImages') || '[]');

    // Delete removed images
    const removedImages = product.images.filter(img => !existingImages.includes(img));
    for (const imageUrl of removedImages) {
      try {
        const imagePath = path.join(process.cwd(), 'public', imageUrl);
        await unlink(imagePath);
      } catch (error) {
        console.error('Error deleting image file:', error);
      }
    }

    // Handle new image uploads
    const images = formData.getAll('images');
    const imageUrls = [...existingImages];

    if (images.length > 0) {
      // Ensure upload directory exists
      await ensureUploadDir();

      // Process new images
      for (const image of images) {
        if (typeof image === 'object' && 'arrayBuffer' in image) {
          const buffer = Buffer.from(await image.arrayBuffer());
          const filename = `${uuidv4()}_${image.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
          const relativePath = `/uploads/products/${filename}`;
          const fullPath = path.join(process.cwd(), 'public', relativePath);

          await writeFile(fullPath, buffer);
          imageUrls.push(relativePath);
        }
      }
    }

    // Update product data
    productData.images = imageUrls;
    productData.updatedAt = new Date();

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: productData },
      { new: true }
    );

    return NextResponse.json({
      message: 'Product updated successfully',
      product: updatedProduct
    });

  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { message: 'Error updating product', error: error.message },
      { status: 500 }
    );
  }
} 