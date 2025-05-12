import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    total: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String
  },
  billingAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String
  },
  paymentMethod: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  tax: {
    type: Number,
    required: true,
    min: 0
  },
  shippingCost: {
    type: Number,
    required: true,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create indexes
orderSchema.index({ customer: 1 });
orderSchema.index({ supplier: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ createdAt: -1 });

// Update timestamps before saving
orderSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema); 