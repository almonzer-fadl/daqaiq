import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { connectToDatabase } from '../../../lib/mongodb';
import User from '../../../lib/models/User';
import { sendVerificationEmail } from '../../../lib/email';

export async function POST(req) {
  try {
    const { name, email, password, role = 'customer' } = await req.json();

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

    // Create verification token only for suppliers
    const verificationToken = role === 'supplier' ? crypto.randomBytes(32).toString('hex') : null;

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      verificationToken,
      // Set isVerified to true for customers, false for suppliers
      isVerified: role === 'customer',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Send verification email only for suppliers
    if (role === 'supplier' && verificationToken) {
      await sendVerificationEmail(email, verificationToken);
    }

    // Remove password from response
    const userWithoutPassword = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified
    };

    return NextResponse.json(
      {
        message: role === 'supplier' 
          ? 'Registration successful. Please verify your email.'
          : 'Registration successful. You can now sign in.',
        user: userWithoutPassword
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json(
      { error: 'Something went wrong during registration' },
      { status: 500 }
    );
  }
} 