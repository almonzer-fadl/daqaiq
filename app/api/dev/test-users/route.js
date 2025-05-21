import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/lib/models';
import bcrypt from 'bcryptjs';

export async function POST() {
  try {
    await connectToDatabase();

    // Create test supplier
    const supplierPassword = await bcrypt.hash('supplier123', 10);
    const supplier = await User.create({
      name: 'Test Supplier',
      email: 'supplier@test.com',
      password: supplierPassword,
      role: 'supplier',
      isVerified: true,
      phone: '1234567890',
      company: 'Test Company',
      address: 'Test Address'
    });

    // Create test admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Test Admin',
      email: 'admin@test.com',
      password: adminPassword,
      role: 'main-admin',
      isVerified: true
    });

    return new Response(JSON.stringify({
      message: 'Test users created successfully',
      users: {
        supplier: {
          email: supplier.email,
          password: 'supplier123',
          role: supplier.role
        },
        admin: {
          email: admin.email,
          password: 'admin123',
          role: admin.role
        }
      }
    }), { status: 200 });
  } catch (error) {
    console.error('Create test users error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
} 