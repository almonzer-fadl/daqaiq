import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
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
    validate: {
      validator: function(v) {
        return /^((\+9665)|(05))[0-9]{8}$/.test(v);
      },
      message: props => `${props.value} is not a valid Saudi phone number!`
    }
  },
  businessType: {
    type: String,
    enum: ['manufacturer', 'distributor', 'retailer', 'other'],
    required: [true, 'Business type is required'],
  },
  taxId: {
    type: String,
    required: [true, 'Tax ID is required'],
    unique: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{15}$/.test(v);
      },
      message: props => `Tax ID must be exactly 15 digits!`
    }
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'suspended'],
    default: 'pending',
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
  },
  bankDetails: {
    bankName: String,
    accountNumber: String,
    accountHolder: String,
    iban: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Update timestamps on save
supplierSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Supplier = mongoose.models.Supplier || mongoose.model('Supplier', supplierSchema);

export default Supplier; 