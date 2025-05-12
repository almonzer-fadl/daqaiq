import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['mainAdmin', 'admin', 'supplier', 'customer'],
    default: 'customer'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  profile: {
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    },
    avatar: String,
    bio: String
  },
  store: {
    name: String,
    description: String,
    logo: String,
    banner: String,
    isApproved: {
      type: Boolean,
      default: false
    },
    approvalDate: Date,
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create indexes
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ isVerified: 1 });
userSchema.index({ 'store.isApproved': 1 });

// Update the updatedAt timestamp before saving
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.User || mongoose.model('User', userSchema); 