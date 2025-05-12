import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectToDatabase } from '../../../../lib/mongodb';
import User from '../../../../lib/models/User';
import { sendPasswordResetEmail } from '../../../../lib/lib/email';

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Please provide an email address' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'No user found with this email' },
        { status: 404 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    // Save reset token to user
    await User.findByIdAndUpdate(user._id, {
      resetPasswordToken: resetToken,
      resetPasswordExpires: resetTokenExpiry
    });

    // Send password reset email
    await sendPasswordResetEmail(email, resetToken);

    return NextResponse.json(
      { message: 'Password reset email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Something went wrong while processing your request' },
      { status: 500 }
    );
  }
} 