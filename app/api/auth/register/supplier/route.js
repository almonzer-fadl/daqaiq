import { connectToDatabase } from '@/lib/mongodb';
import { sendEmail, validateEmail, validatePassword, validatePhone } from '@/lib/utils';
import { User, Supplier } from '@/lib/models';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, phone, businessName, businessType } = body;

    // Validate input
    if (!validateEmail(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), { status: 400 });
    }
    if (!validatePassword(password)) {
      return new Response(JSON.stringify({ error: 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number' }), { status: 400 });
    }
    if (!validatePhone(phone)) {
      return new Response(JSON.stringify({ error: 'Invalid phone number format' }), { status: 400 });
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
      role: 'supplier',
      profile: {
        phone
      }
    });

    // Create supplier profile
    await Supplier.create({
      user: user._id,
      businessName,
      businessType,
      contactInfo: {
        phone,
        email
      }
    });

    // Send welcome email
    await sendEmail({
      to: email,
      subject: 'Welcome to Daqaiq - Supplier Registration',
      html: `
        <h1>Welcome to Daqaiq!</h1>
        <p>Thank you for registering as a supplier. Your account is currently under review.</p>
        <p>We will notify you once your account has been verified.</p>
      `
    });

    return new Response(JSON.stringify({ message: 'Registration successful' }), { status: 201 });
  } catch (error) {
    console.error('Supplier registration error:', error);
    return new Response(JSON.stringify({ error: 'Registration failed' }), { status: 500 });
  }
} 