import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/dbConnect';
import Supplier from '@/models/Supplier';
import { sendPasswordResetEmail } from '@/lib/email/email';

export async function POST(req) {
  try {
    await dbConnect();

    const { email } = await req.json();

    // Find supplier
    const supplier = await Supplier.findOne({ email });
    if (!supplier) {
      // For security, don't reveal if email exists
      return NextResponse.json(
        { message: 'إذا كان الحساب موجوداً، سيتم إرسال رابط إعادة تعيين كلمة المرور' },
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

    // Send reset email using the dedicated function
    try {
      await sendPasswordResetEmail(email, resetToken);
    } catch (emailError) {
      console.error('Failed to send reset email:', emailError);
      return NextResponse.json(
        { message: 'حدث خطأ أثناء إرسال البريد الإلكتروني' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'إذا كان الحساب موجوداً، سيتم إرسال رابط إعادة تعيين كلمة المرور' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { message: 'حدث خطأ أثناء معالجة الطلب' },
      { status: 500 }
    );
  }
} 