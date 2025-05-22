import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  role: {
    type: String,
    enum: ['supplier'],
    default: 'supplier',
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'suspended'],
    default: 'pending',
  },
  resetToken: String,
  resetTokenExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  lastLoginAt: Date,
  // Business Details
  businessType: String,
  taxNumber: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
  },
  // Bank Details
  bankDetails: {
    bankName: String,
    accountNumber: String,
    accountHolder: String,
    iban: String,
  },
  // Settings
  notificationPreferences: {
    email: {
      type: Boolean,
      default: true,
    },
    sms: {
      type: Boolean,
      default: false,
    },
  },
  // Stats
  stats: {
    totalOrders: {
      type: Number,
      default: 0,
    },
    totalProducts: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
});

// Update timestamps on save
supplierSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Don't return password and reset token in queries
supplierSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    delete ret.resetToken;
    delete ret.resetTokenExpiry;
    return ret;
  }
});

const Supplier = mongoose.models.Supplier || mongoose.model('Supplier', supplierSchema);

export default Supplier; 