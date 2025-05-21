import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Supplier from '@/lib/models/Supplier';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: 'Token and password are required' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const supplier = await Supplier.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!supplier) {
      return NextResponse.json(
        { message: 'Password reset token is invalid or has expired' },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update supplier's password and clear reset token fields
    supplier.password = hashedPassword;
    supplier.resetPasswordToken = undefined;
    supplier.resetPasswordExpires = undefined;
    await supplier.save();

    return NextResponse.json(
      { message: 'Password has been reset successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { message: 'An error occurred while resetting your password' },
      { status: 500 }
    );
  }
} 