import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
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

// Update the updatedAt timestamp before saving
supplierSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Supplier = mongoose.models.Supplier || mongoose.model('Supplier', supplierSchema);

export default Supplier; 