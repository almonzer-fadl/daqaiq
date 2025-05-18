import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  secure: process.env.NODE_ENV === 'production',
});

export async function sendEmail({ to, subject, html }) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendVerificationEmail(email, name, verificationUrl) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Verify your email address',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to Daqaiq!</h2>
        <p>Hello ${name},</p>
        <p>Thank you for registering with Daqaiq. Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 15px 32px; text-decoration: none; border-radius: 4px;">
            Verify Email
          </a>
        </div>
        <p>If the button doesn't work, you can also click this link:</p>
        <p><a href="${verificationUrl}">${verificationUrl}</a></p>
        <p>This link will expire in 24 hours.</p>
        <p>Best regards,<br>The Daqaiq Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendPasswordResetEmail(email, name, resetUrl) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Reset your password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>Hello ${name},</p>
        <p>We received a request to reset your password. Click the button below to create a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 15px 32px; text-decoration: none; border-radius: 4px;">
            Reset Password
          </a>
        </div>
        <p>If the button doesn't work, you can also click this link:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>This link will expire in 1 hour. If you didn't request this, please ignore this email.</p>
        <p>Best regards,<br>The Daqaiq Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendWelcomeEmail(email, name) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Welcome to Daqaiq!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to Daqaiq!</h2>
        <p>Hello ${name},</p>
        <p>Thank you for joining Daqaiq. We're excited to have you as part of our community!</p>
        <p>Here are some things you can do:</p>
        <ul>
          <li>Browse our extensive catalog of auto parts</li>
          <li>Save your favorite items</li>
          <li>Track your orders</li>
          <li>Get personalized recommendations</li>
        </ul>
        <p>If you have any questions, our support team is always here to help.</p>
        <p>Best regards,<br>The Daqaiq Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
} 