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

    console.log('Registration attempt:', { name, email, businessName, businessType });

    // Validate input
    if (!name || !email || !password || !businessName || !businessType || !taxId) {
      console.log('Missing required fields:', { name, email, businessName, businessType, taxId });
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

    try {
      await connectToDatabase();
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { error: 'Database connection error' },
        { status: 500 }
      );
    }

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

    try {
      // Create new user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: 'supplier',
        verificationToken,
        isVerified: true,
        phoneNumber,
      });

      // Create supplier profile
      await Supplier.create({
        userId: user._id,
        companyName: businessName,
        businessType: businessType,
        taxId,
        phone: phoneNumber,
        status: 'pending',
        verificationStatus: 'unverified'
      });

      // Send verification email (but don't wait for it)
      sendVerificationEmail(email, verificationToken).catch(console.error);

      // Remove password from response
      const userWithoutPassword = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phoneNumber,
        role: user.role,
        isVerified: user.isVerified
      };

      return NextResponse.json(
        { message: 'Supplier registered successfully', user: userWithoutPassword },
        { status: 201 }
      );
    } catch (createError) {
      console.error('Error creating user/supplier:', createError);
      return NextResponse.json(
        { error: 'Error creating user account' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json(
      { error: 'Something went wrong during registration' },
      { status: 500 }
    );
  }
} 