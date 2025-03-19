import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  businessName: {
    type: String,
    required: [true, 'Please provide a business name'],
    trim: true,
  },
  businessType: {
    type: String,
    required: true,
    enum: ['individual', 'company'],
  },
  taxId: {
    type: String,
    required: true,
    unique: true,
  },
  businessAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
  },
  bankInfo: {
    bankName: String,
    accountNumber: String,
    accountHolder: String,
    iban: String,
    swift: String,
  },
  documents: [{
    type: {
      type: String,
      enum: ['business_license', 'tax_certificate', 'id_proof', 'other'],
    },
    url: String,
    verified: {
      type: Boolean,
      default: false,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'suspended', 'rejected'],
    default: 'pending',
  },
  commissionRate: {
    type: Number,
    required: true,
    default: 10, // Default 10% commission
    min: 0,
    max: 100,
  },
  metrics: {
    totalSales: {
      type: Number,
      default: 0,
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
    cancelledOrders: {
      type: Number,
      default: 0,
    },
    returnRate: {
      type: Number,
      default: 0,
    },
  },
  settings: {
    autoAcceptOrders: {
      type: Boolean,
      default: false,
    },
    minimumOrderValue: {
      type: Number,
      default: 0,
    },
    shippingMethods: [{
      name: String,
      cost: Number,
      estimatedDays: Number,
      isActive: {
        type: Boolean,
        default: true,
      },
    }],
  },
}, {
  timestamps: true,
});

// Create indexes for faster queries
supplierSchema.index({ status: 1 });
supplierSchema.index({ 'rating.average': -1 });
supplierSchema.index({ businessName: 'text' });

const Supplier = mongoose.models.Supplier || mongoose.model('Supplier', supplierSchema);

export default Supplier; 