import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/user';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    await connectToDatabase();

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
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      roles: ['main-admin'],
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Remove password from response
    const userWithoutPassword = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      roles: user.roles,
      isVerified: user.isVerified
    };

    return NextResponse.json(
      {
        message: 'Admin registration successful.',
        user: userWithoutPassword
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Admin Registration Error:', error);
    return NextResponse.json(
      { error: 'Something went wrong during registration' },
      { status: 500 }
    );
  }
} 