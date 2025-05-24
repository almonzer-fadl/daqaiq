import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT),
  secure: process.env.EMAIL_SERVER_PORT === '465',
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

// Verify SMTP connection configuration
async function verifyEmailConfig() {
  try {
    await transporter.verify();
    console.log('Email server connection verified');
    return true;
  } catch (error) {
    console.error('Email server connection error:', error);
    return false;
  }
}

export async function sendVerificationEmail(email, token) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Verify your email address',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Verify your email address</h2>
        <p>Thank you for registering as a supplier. Please click the button below to verify your email address:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Verify Email
          </a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p>${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't request this verification, you can safely ignore this email.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
}

export async function sendPasswordResetEmail(email, token) {
  try {
    // Verify email configuration first
    const isEmailConfigValid = await verifyEmailConfig();
    if (!isEmailConfigValid) {
      throw new Error('خطأ في إعدادات البريد الإلكتروني');
    }

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/supplier/auth/reset-password?token=${token}`;

    const mailOptions = {
      from: {
        name: 'دقائق - خدمة الموردين',
        address: process.env.EMAIL_FROM
      },
      to: email,
      subject: 'إعادة تعيين كلمة المرور - دقائق',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; direction: rtl; text-align: right; font-family: Arial, sans-serif;">
          <h1 style="color: #333; text-align: center; margin-bottom: 20px;">إعادة تعيين كلمة المرور</h1>
          <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
            لقد طلبت إعادة تعيين كلمة المرور الخاصة بك. انقر على الزر أدناه لإنشاء كلمة مرور جديدة:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}"
               style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              إعادة تعيين كلمة المرور
            </a>
          </div>
          <p style="color: #666; font-size: 14px; margin-bottom: 10px;">
            إذا لم تطلب إعادة تعيين كلمة المرور، يمكنك تجاهل هذا البريد الإلكتروني.
          </p>
          <p style="color: #666; font-size: 14px; margin-bottom: 20px;">
            أو يمكنك نسخ ولصق هذا الرابط في متصفحك:<br>
            <a href="${resetUrl}" style="color: #3b82f6; word-break: break-all;">${resetUrl}</a>
          </p>
          <p style="color: #666; font-size: 14px; margin-bottom: 0;">
            هذا الرابط سينتهي خلال ساعة واحدة.
          </p>
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #888; font-size: 12px; margin: 0;">
              دقائق - منصة الموردين
            </p>
          </div>
        </div>
      `,
    };

    console.log('Attempting to send password reset email to:', email);
    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('فشل في إرسال بريد إعادة تعيين كلمة المرور');
  }
} 