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
  },
  role: String, // Old field to be migrated
});

// Create User model
const User = mongoose.models.User || mongoose.model('User', userSchema);

async function migrateRoles() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    console.log('Finding users with old role format...');
    const users = await User.find({
      $or: [
        { role: { $exists: true } },
        { roles: { $exists: false } }
      ]
    });

    console.log(`Found ${users.length} users to migrate`);

    for (const user of users) {
      const oldRole = user.role || 'customer';
      const newRoles = Array.isArray(user.roles) ? user.roles : [oldRole];

      console.log(`Migrating user ${user.email} from role '${oldRole}' to roles ${JSON.stringify(newRoles)}`);

      await User.findByIdAndUpdate(user._id, {
        $set: { roles: newRoles },
        $unset: { role: "" }
      });
    }

    console.log('Migration completed successfully');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateRoles(); 