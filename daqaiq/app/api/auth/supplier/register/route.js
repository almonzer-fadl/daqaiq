import { connectToDatabase } from '../../../../../lib/mongodb';
import User from '../../../../../lib/models/User';
import { validateRegistration } from '../../../../../lib/lib/utils/validation';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate registration data
    const validationError = validateRegistration(data);
    if (validationError) {
      return new Response(JSON.stringify({ error: validationError }), {
        
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12);

    // Create new user
    const user = await User.create({
      ...data,
      password: hashedPassword,
      role: 'supplier',
      isVerified: false,
    });

    return new Response(JSON.stringify({ 
      message: 'Supplier registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Registration error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 