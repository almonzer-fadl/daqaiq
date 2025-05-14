import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '../../../../../lib/mongodb';
import Order from '../../../../../lib/models/Order';
import Product from '../../../../../lib/models/Product';
import { authOptions } from '../../../auth/config/auth';

export const dynamic = 'force-dynamic';

import { connectToDatabase } from '../../../../lib/mongodb';
import Order from '../../../../lib/models/Order';
import Product from '../../../../lib/models/Product'; 