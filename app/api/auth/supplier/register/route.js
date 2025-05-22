import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import Supplier from '@/models/Supplier';

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { email, password, companyName, phone } = body;

    // Check if supplier already exists
    const existingSupplier = await Supplier.findOne({ email });
    if (existingSupplier) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new supplier
    const supplier = await Supplier.create({
      email,
      password: hashedPassword,
      companyName,
      phone,
      role: 'supplier',
      status: 'pending', // Suppliers need approval before they can start selling
    });

    // Remove password from response
    const supplierWithoutPassword = {
      _id: supplier._id,
      email: supplier.email,
      companyName: supplier.companyName,
      phone: supplier.phone,
      role: supplier.role,
      status: supplier.status,
    };

    return NextResponse.json(
      { message: 'Registration successful', user: supplierWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Error creating account' },
      { status: 500 }
    );
  }
} 