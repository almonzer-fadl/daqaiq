import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/dbConnect';
import Supplier from '@/models/Supplier';
import { sendEmail } from '@/lib/email';

export async function POST(req) {
  try {
    await dbConnect();

    const { email } = await req.json();

    // Find supplier
    const supplier = await Supplier.findOne({ email });
    if (!supplier) {
      // For security, don't reveal if email exists
      return NextResponse.json(
        { message: 'If an account exists, a reset link has been sent.' },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    // Save reset token to supplier
    supplier.resetToken = resetToken;
    supplier.resetTokenExpiry = resetTokenExpiry;
    await supplier.save();

    // Send reset email
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`;
    
    await sendEmail({
      to: email,
      subject: 'Reset Your Password - Daqaiq Supplier',
      html: `
        <h1>Password Reset Request</h1>
        <p>You requested to reset your password. Click the link below to reset it:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    });

    return NextResponse.json(
      { message: 'If an account exists, a reset link has been sent.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { message: 'Error processing request' },
      { status: 500 }
    );
  }
} 