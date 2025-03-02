
import nodemailer from 'nodemailer';

export async function POST(req) {
  const { name, email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `رسالة جديدة من ${name}`,
      text: message,
      html: `
        <h3>معلومات المرسل:</h3>
        <p>الاسم: ${name}</p>
        <p>البريد الإلكتروني: ${email}</p>
        <h3>الرسالة:</h3>
        <p>${message}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
    });
  }
}