import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password should be at least 6 characters'],
  },
  role: {
    type: String,
    enum: ['customer', 'supplier', 'admin'],
    default: 'customer',
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  addresses: [{
    title: String,
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
    isDefault: {
      type: Boolean,
      default: false,
    },
  }],
  avatar: {
    type: String,
    default: '/images/default-avatar.png',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: Date,
}, {
  timestamps: true,
});

// Create indexes for faster queries
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User; 