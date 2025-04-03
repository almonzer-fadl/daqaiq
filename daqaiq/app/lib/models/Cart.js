import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    selectedOptions: {
      color: String,
      size: String,
      // Add other product-specific options as needed
    },
  }],
  subtotal: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Create indexes for faster queries
cartSchema.index({ user: 1 });
cartSchema.index({ 'items.product': 1 });

// Pre-save middleware to update subtotal
cartSchema.pre('save', function(next) {
  this.subtotal = this.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  next();
});

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default Cart; 