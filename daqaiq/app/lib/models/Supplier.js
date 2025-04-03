import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  contactName: String,
  email: {
    type: String,
    required: true
  },
  phone: String,
  address: String,
  city: String,
  state: String,
  country: String,
  postalCode: String,
  taxId: String,
  businessType: {
    type: String,
    enum: ['corporation', 'llc', 'partnership', 'soleProprietorship', '']
  },
  description: String,
  website: String,
  image: String,
  socialMedia: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String
  },
  bankInfo: {
    accountName: String,
    accountNumber: String,
    bankName: String,
    swiftCode: String
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'active'
  },
  verificationStatus: {
    type: String,
    enum: ['unverified', 'pending', 'verified'],
    default: 'unverified'
  }
}, {
  timestamps: true
});

// Create indexes
supplierSchema.index({ userId: 1 });
supplierSchema.index({ email: 1 });
supplierSchema.index({ companyName: 1 });

const Supplier = mongoose.models.Supplier || mongoose.model('Supplier', supplierSchema);

export default Supplier; 