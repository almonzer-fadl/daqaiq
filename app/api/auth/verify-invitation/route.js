import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();

    // Find and validate invitation
    const invitation = await db.collection('adminInvitations').findOne({
      token,
      expires: { $gt: new Date() },
    });

    if (!invitation) {
      return NextResponse.json(
        { error: 'Invalid or expired invitation' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({
      email: invitation.email,
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      invitation: {
        email: invitation.email,
        name: invitation.name,
      },
    });
  } catch (error) {
    console.error('Error verifying invitation:', error);
    return NextResponse.json(
      { error: 'Failed to verify invitation' },
      { status: 500 }
    );
  }
} 