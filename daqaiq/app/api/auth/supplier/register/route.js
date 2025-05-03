import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDB } from '@/lib/mongoose';
import User from '@/models/user';
import { validateEmail, validatePassword } from '@/lib/validation';

export async function POST(req) {
  try {
    const { name, email, password, companyName, companyRegistration } = await req.json();

    // Validate required fields
    if (!name || !email || !password || !companyName || !companyRegistration) {
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

    // Validate password
    if (!validatePassword(password)) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters and contain at least one number' },
        { status: 400 }
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

    // Create new supplier user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      roles: ['supplier'],
      companyName,
      companyRegistration,
      emailVerified: null, // Requires verification
    });

    // TODO: Send verification email

    return NextResponse.json(
      { 
        message: 'Supplier registered successfully. Please check your email for verification.',
        userId: newUser._id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Supplier registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 