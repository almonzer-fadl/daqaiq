import nodemailer from 'nodemailer';

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'almonzerfadl@gmail.com',
    pass: 'ywqlqkashqzmngjr', // App password for Gmail
  },
});

export async function sendEmail({ to, subject, html }) {
  try {
    const mailOptions = {
      from: {
        name: 'Daqaiq Store',
        address: 'almonzerfadl@gmail.com'
      },
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
} 