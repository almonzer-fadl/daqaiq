import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  // Like a magic mailbox that sends letters to you!
  const { name, email, message } = await req.json();
  
  const mailbox = nodemailer.createTransport({
    host: "smtp.gmail.com",  // Like your post office address
    port: 587,
    auth: {
      user: process.env.EMAIL,     // Your email
      pass: process.env.PASSWORD   // Your special key
    }
  });

  try {
    await mailbox.sendMail({
      to: "daqaiqplus@gmail.com",
      subject: `رسالة جديدة من ${name}`,
      text: message
    });
    return NextResponse.json({ message: "تم إرسال الرسالة!" });
  } catch (error) {
    return NextResponse.json({ error: "عذراً، حدث خطأ" });
  }
}