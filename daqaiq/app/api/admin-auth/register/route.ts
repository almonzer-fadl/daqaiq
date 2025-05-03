import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDB } from '@/lib/mongoose';
import User from '@/models/user';
import { validateEmail } from '@/lib/validation';

export async function POST(req: Request) {
  try {
    const { name, email, password, adminCode } = await req.json();

    // Validate required fields
    if (!name || !email || !password || !adminCode) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Verify admin registration code
    const ADMIN_REGISTRATION_CODE = process.env.ADMIN_REGISTRATION_CODE;
    if (adminCode !== ADMIN_REGISTRATION_CODE) {
      return NextResponse.json(
        { error: 'Invalid admin registration code' },
        { status: 403 }
      );
    }

    await connectToDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new admin user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      roles: ['main-admin'],
      emailVerified: new Date(), // Auto-verify admin accounts
    });

    return NextResponse.json(
      { message: 'Admin registered successfully', userId: newUser._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Admin registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 