import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();

    // Check if any admin exists
    const existingAdmin = await db.collection('users').findOne({ role: 'admin' });
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Main admin already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create main admin user
    const result = await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
      status: 'active',
      isMainAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: 'Main admin created successfully',
      userId: result.insertedId,
    });
  } catch (error) {
    console.error('Error creating main admin:', error);
    return NextResponse.json(
      { error: 'Failed to create main admin' },
      { status: 500 }
    );
  }
} 