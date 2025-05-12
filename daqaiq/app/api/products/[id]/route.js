import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { connectToDatabase } from '../../../../lib/mongodb';
import Product from '../../../../lib/models/Product';

// Add segment config to explicitly mark as dynamic
export const dynamic = 'force-dynamic';

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    const updates = await request.json();
    
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );
    
    if (!updatedProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
} 