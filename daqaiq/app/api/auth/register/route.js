import { connectToDatabase } from '@/lib/mongodb';
import { sendEmail, validateEmail, validatePassword } from '@/lib/utils';
import { User } from '@/lib/models';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Validate input
    if (!validateEmail(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), { status: 400 });
    }
    if (!validatePassword(password)) {
      return new Response(JSON.stringify({ error: 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number' }), { status: 400 });
    }

    await connectToDatabase();

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'Email already registered' }), { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'customer'
    });

    // Send welcome email
    await sendEmail({
      to: email,
      subject: 'Welcome to Daqaiq',
      html: `
        <h1>Welcome to Daqaiq!</h1>
        <p>Thank you for registering. We're excited to have you on board.</p>
      `
    });

    return new Response(JSON.stringify({ message: 'Registration successful' }), { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return new Response(JSON.stringify({ error: 'Registration failed' }), { status: 500 });
  }
} 