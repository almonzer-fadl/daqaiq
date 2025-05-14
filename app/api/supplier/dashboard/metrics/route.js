import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/config/auth';
import { connectToDatabase } from '../../../../../lib/mongodb';
import Product from '../../../../../lib/models/Product';
import Order from '../../../../../lib/models/Order';

// Add segment config to explicitly mark as dynamic
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request) {
  // ... rest of the code
} 