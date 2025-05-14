import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/config/auth';
import { connectToDatabase } from '../../../lib/mongodb';
import Product from '../../../lib/models/Product';
import { generateSlug } from '../../../lib/utils/slug';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// ... existing code ... 