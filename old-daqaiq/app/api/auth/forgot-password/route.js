import { connectToDatabase } from '@/lib/mongodb';
import { sendEmail } from '@/lib/utils/email';
import User from '@/lib/models/User';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const { email } = await request.json();

    await connectToDatabase();
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    // Update user with reset token
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    // Send reset email
    await sendEmail({
      to: email,
      subject: 'Password Reset - Daqaiq',
      html: `
        <h1>Password Reset Request</h1>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}">
          Reset Password
        </a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    });

    return new Response(JSON.stringify({ message: 'Password reset email sent' }), { status: 200 });
  } catch (error) {
    console.error('Password reset error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process password reset' }), { status: 500 });
  }
} 