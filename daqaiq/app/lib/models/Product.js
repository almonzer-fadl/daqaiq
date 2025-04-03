import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  additionalImages: [{
    type: String
  }],
  category: {
    type: String,
    required: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  lowStockThreshold: {
    type: Number,
    required: true,
    min: 0,
    default: 10
  },
  variants: [{
    name: String,
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    lowStockThreshold: {
      type: Number,
      required: true,
      min: 0,
      default: 5
    }
  }],
  stockHistory: [{
    quantity: Number,
    type: {
      type: String,
      enum: ['increase', 'decrease', 'adjustment'],
      required: true
    },
    reason: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamps on save
productSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Method to check if stock is low
productSchema.methods.isLowStock = function() {
  return this.stock <= this.lowStockThreshold;
};

// Method to update stock
productSchema.methods.updateStock = function(quantity, type, reason) {
  const oldStock = this.stock;
  
  if (type === 'increase') {
    this.stock += quantity;
  } else if (type === 'decrease') {
    if (this.stock < quantity) {
      throw new Error('Insufficient stock');
    }
    this.stock -= quantity;
  } else if (type === 'adjustment') {
    this.stock = quantity;
  }

  this.stockHistory.push({
    quantity: Math.abs(this.stock - oldStock),
    type,
    reason,
    date: new Date()
  });
};

// Virtual for low stock status
productSchema.virtual('stockStatus').get(function() {
  if (this.stock <= 0) return 'out_of_stock';
  if (this.stock <= this.lowStockThreshold) return 'low_stock';
  return 'in_stock';
});

// Create indexes for faster queries
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ supplier: 1 });
productSchema.index({ status: 1 });

// Don't create the model if it already exists
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product; 