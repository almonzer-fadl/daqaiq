import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectToDatabase } from '@/lib/mongodb';
import Supplier from '@/lib/models/Supplier';
import { sendEmail } from '@/lib/email';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const supplier = await Supplier.findOne({ email });

    if (!supplier) {
      // For security reasons, we don't want to reveal if an email exists or not
      return NextResponse.json(
        { message: 'If an account exists with this email, you will receive password reset instructions.' },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    // Save reset token to supplier
    supplier.resetPasswordToken = resetToken;
    supplier.resetPasswordExpires = resetTokenExpiry;
    await supplier.save();

    // Create reset URL
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/supplier/auth/reset-password?token=${resetToken}`;

    // Send email
    await sendEmail({
      to: email,
      subject: 'Password Reset Request',
      html: `
        <p>You requested a password reset for your supplier account.</p>
        <p>Click the link below to reset your password. This link will expire in 1 hour:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    });

    return NextResponse.json(
      { message: 'If an account exists with this email, you will receive password reset instructions.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { message: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
} 