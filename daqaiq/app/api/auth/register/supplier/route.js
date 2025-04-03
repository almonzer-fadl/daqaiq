import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { connectToDatabase } from '../../../../lib/mongodb';
import User from '../../../../lib/models/User';
import Supplier from '../../../../lib/models/Supplier';
import { sendVerificationEmail } from '../../../../lib/email';

export async function POST(req) {
  try {
    const {
      name,
      email,
      password,
      businessName,
      businessType,
      taxId,
      phoneNumber,
    } = await req.json();

    // Validate input
    if (!name || !email || !password || !businessName || !businessType || !taxId) {
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
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Check if tax ID is already registered
    const existingSupplier = await Supplier.findOne({ taxId });
    if (existingSupplier) {
      return NextResponse.json(
        { error: 'Tax ID is already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'supplier',
      verificationToken,
      isVerified: true,
    });

    // Create supplier profile
    await Supplier.create({
      user: user._id,
      businessName,
      businessType,
      taxId,
      phoneNumber,
      status: 'pending', // Suppliers need admin approval
    });

    // Send verification email (but don't wait for it)
    sendVerificationEmail(email, verificationToken).catch(console.error);

    // Remove password from response
    const userWithoutPassword = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      storeName: user.storeName,
      storeAddress: user.storeAddress,
      isVerified: user.isVerified
    };

    return NextResponse.json(
      { message: 'Supplier registered successfully', user: userWithoutPassword },
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