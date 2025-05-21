import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const supplierSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password must be at least 8 characters long'],
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user'],
  },
  companyName: {
    type: String,
    required: [true, 'Please provide a company name'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  businessType: {
    type: String,
    enum: ['manufacturer', 'distributor', 'retailer', 'other'],
    required: [true, 'Please provide a business type'],
  },
  taxId: {
    type: String,
    unique: true,
    sparse: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
supplierSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    this.updatedAt = new Date();
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
supplierSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Update the updatedAt timestamp before saving
supplierSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Supplier = mongoose.models.Supplier || mongoose.model('Supplier', supplierSchema);

export default Supplier; 