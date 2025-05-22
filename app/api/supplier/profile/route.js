import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/config/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/lib/models';

// Add segment config to explicitly mark as dynamic
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET /api/supplier/profile
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'supplier') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    
    // First, try to find existing supplier profile
    let supplier = await Supplier.findOne({ userId: session.user.id });
    
    // If no supplier profile exists, create one from user data
    if (!supplier) {
      const user = await User.findById(session.user.id);
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      supplier = await Supplier.create({
        userId: user._id,
        companyName: user.name || '',
        contactName: user.name || '',
        email: user.email,
        image: user.image || '',
        status: 'active',
      });
    }

    return NextResponse.json({ profile: supplier });
  } catch (error) {
    console.error('Error fetching supplier profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/supplier/profile
export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'supplier') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const updates = {};

    // Process text fields
    const fields = [
      'companyName', 'contactName', 'email', 'phone', 'address',
      'city', 'state', 'country', 'postalCode', 'taxId',
      'businessType', 'description', 'website'
    ];

    fields.forEach(field => {
      const value = formData.get(field);
      if (value !== null && value !== undefined) {
        updates[field] = value;
      }
    });

    // Process JSON fields
    ['socialMedia', 'bankInfo'].forEach(field => {
      const value = formData.get(field);
      if (value) {
        try {
          updates[field] = JSON.parse(value);
        } catch (e) {
          console.error(`Error parsing ${field}:`, e);
        }
      }
    });

    // Process image if provided
    const image = formData.get('image');
    if (image && image instanceof Blob) {
      // Convert the image to a data URL for storage
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Image = buffer.toString('base64');
      const mimeType = image.type;
      updates.image = `data:${mimeType};base64,${base64Image}`;
    }

    await connectToDatabase();
    
    // Find or create supplier profile
    let supplier = await Supplier.findOne({ userId: session.user.id });
    
    if (!supplier) {
      const user = await User.findById(session.user.id);
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      supplier = await Supplier.create({
        userId: user._id,
        ...updates,
        status: 'active',
      });
    } else {
      supplier = await Supplier.findOneAndUpdate(
        { userId: session.user.id },
        { $set: updates },
        { new: true }
      );
    }

    return NextResponse.json({
      message: 'Profile updated successfully',
      profile: supplier
    });
  } catch (error) {
    console.error('Error updating supplier profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 