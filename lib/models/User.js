import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
    required: true,
  },
  role: {
    type: String,
    enum: ['mainAdmin', 'admin', 'supplier', 'customer'],
    default: 'customer',
    index: true
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String,
    sparse: true,
    index: true
  },
  resetPasswordToken: {
    type: String,
    sparse: true,
    index: true
  },
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
  image: String,
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Export the model
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User; 