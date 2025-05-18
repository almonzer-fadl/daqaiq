import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Define User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  roles: {
    type: [String],
    enum: ['customer', 'supplier', 'admin', 'main-admin'],
    default: ['customer']
  }
});

// Create User model
const User = mongoose.models.User || mongoose.model('User', userSchema);

async function updateUserRoles() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const email = 'valmonzer@proton.me';
    console.log(`Updating roles for user: ${email}`);

    const user = await User.findOne({ email });
    if (!user) {
      console.error('User not found');
      process.exit(1);
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          roles: ['supplier', 'main-admin'],
          isVerified: true,
          status: 'active'
        }
      },
      { new: true }
    );

    console.log('User updated successfully:', {
      email: updatedUser.email,
      roles: updatedUser.roles,
      isVerified: updatedUser.isVerified,
      status: updatedUser.status
    });

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Update failed:', error);
    process.exit(1);
  }
}

updateUserRoles(); 