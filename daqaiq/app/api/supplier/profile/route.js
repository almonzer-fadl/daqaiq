import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectToDatabase } from '@/lib/mongodb';
import { Supplier } from '@/lib/models';
import User from '../../../../../lib/models/User';
// import { uploadToS3 } from '../../../lib/s3'; // Uncomment if you have S3 upload functionality

export const dynamic = 'force-dynamic';

// GET /api/supplier/profile
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    await connectToDatabase();

    const supplier = await Supplier.findOne({ user: session.user.id })
      .populate('user', 'name email');

    if (!supplier) {
      return new Response(JSON.stringify({ error: 'Supplier profile not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(supplier), { status: 200 });
  } catch (error) {
    console.error('Get supplier profile error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// PUT /api/supplier/profile
export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const data = await request.json();
    await connectToDatabase();

    const supplier = await Supplier.findOneAndUpdate(
      { user: session.user.id },
      { $set: data },
      { new: true, runValidators: true }
    ).populate('user', 'name email');

    if (!supplier) {
      return new Response(JSON.stringify({ error: 'Supplier profile not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(supplier), { status: 200 });
  } catch (error) {
    console.error('Update supplier profile error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
} 