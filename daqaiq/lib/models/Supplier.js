import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  businessName: {
    type: String,
    required: true,
    trim: true
  },
  businessType: {
    type: String,
    required: true,
    enum: ['individual', 'company']
  },
  taxNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  commercialRegister: {
    type: String,
    unique: true,
    sparse: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: {
      type: String,
      default: 'Saudi Arabia'
    }
  },
  contactInfo: {
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    website: String
  },
  bankInfo: {
    bankName: String,
    accountNumber: String,
    iban: String
  },
  documents: [{
    type: {
      type: String,
      enum: ['commercial_register', 'tax_certificate', 'bank_statement', 'other']
    },
    url: String,
    verified: {
      type: Boolean,
      default: false
    }
  }],
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
supplierSchema.index({ user: 1 });
supplierSchema.index({ businessName: 1 });
supplierSchema.index({ verificationStatus: 1 });
supplierSchema.index({ 'rating.average': -1 });

const Supplier = mongoose.models.Supplier || mongoose.model('Supplier', supplierSchema);
export default Supplier; 