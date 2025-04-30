import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/db';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import crypto from 'crypto';
import { sendEmail } from '@/lib/email';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { email, name } = await request.json();
    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Generate invitation token
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Store invitation in database
    await db.collection('adminInvitations').insertOne({
      email,
      name,
      token,
      expires,
      invitedBy: session.user.id,
      createdAt: new Date(),
    });

    // Send invitation email
    const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/signup?token=${token}`;
    await sendEmail({
      to: email,
      subject: 'Admin Invitation - Daqaiq',
      html: `
        <h1>Welcome to Daqaiq Admin Panel</h1>
        <p>You have been invited to join the Daqaiq admin team.</p>
        <p>Click the link below to set up your account:</p>
        <a href="${inviteLink}">Set Up Your Account</a>
        <p>This link will expire in 24 hours.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending admin invitation:', error);
    return NextResponse.json(
      { error: 'Failed to send invitation' },
      { status: 500 }
    );
  }
} 