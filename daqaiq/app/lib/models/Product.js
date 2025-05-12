import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  compareAtPrice: {
    type: Number,
    min: 0
  },
  images: [{
    type: String,
    required: true
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
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
  sku: {
    type: String,
    unique: true,
    sparse: true
  },
  barcode: {
    type: String,
    unique: true,
    sparse: true
  },
  weight: {
    value: Number,
    unit: {
      type: String,
      enum: ['g', 'kg', 'oz', 'lb'],
      default: 'g'
    }
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: {
      type: String,
      enum: ['cm', 'in'],
      default: 'cm'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [String],
  attributes: [{
    name: String,
    value: String
  }],
  ratings: {
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
  },
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
productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });
productSchema.index({ supplier: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ 'ratings.average': -1 });
productSchema.index({ createdAt: -1 });

// Update timestamps before saving
productSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Product || mongoose.model('Product', productSchema); 