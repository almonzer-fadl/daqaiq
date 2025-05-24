import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/dbConnect';
import Supplier from '@/models/Supplier';
import { sendPasswordResetEmail } from '@/lib/email/email';

export async function POST(req) {
  const session = await dbConnect();
  
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: 'البريد الإلكتروني مطلوب' },
        { status: 400 }
      );
    }

    // Find supplier
    const supplier = await Supplier.findOne({ email });
    
    // Generate reset token regardless of whether supplier exists (for security)
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    if (supplier) {
      try {
        // Save reset token to supplier
        supplier.resetToken = resetToken;
        supplier.resetTokenExpiry = resetTokenExpiry;
        await supplier.save();

        // Send reset email
        await sendPasswordResetEmail(email, resetToken);
        
        console.log('Password reset email sent successfully to:', email);
      } catch (error) {
        console.error('Error in password reset process:', error);
        
        // Clean up token if email sending fails
        if (supplier.resetToken) {
          supplier.resetToken = undefined;
          supplier.resetTokenExpiry = undefined;
          await supplier.save();
        }
        
        return NextResponse.json(
          { message: 'حدث خطأ أثناء إرسال البريد الإلكتروني. الرجاء المحاولة مرة أخرى.' },
          { status: 500 }
        );
      }
    }

    // Always return success for security (don't reveal if email exists)
    return NextResponse.json(
      { message: 'إذا كان البريد الإلكتروني مسجلاً، سيتم إرسال رابط إعادة تعيين كلمة المرور.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { message: 'حدث خطأ أثناء معالجة الطلب. الرجاء المحاولة مرة أخرى.' },
      { status: 500 }
    );
  } finally {
    // Close the MongoDB session
    if (session) {
      await session.endSession();
    }
  }
} 