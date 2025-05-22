import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import dbConnect from '@/lib/dbConnect';
import Supplier from '@/models/Supplier';

// Add segment config to explicitly mark as dynamic
export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const token = await getToken({ req });

    if (!token || token.role !== 'supplier') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // Get supplier data
    const supplier = await Supplier.findById(token.id);
    if (!supplier) {
      return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
    }

    // Return analytics data
    return NextResponse.json({
      stats: supplier.stats,
      lastLoginAt: supplier.lastLoginAt,
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Error fetching analytics' },
      { status: 500 }
    );
  }
}