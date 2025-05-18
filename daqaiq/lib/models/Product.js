import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a product price'],
    min: [0, 'Price cannot be negative'],
  },
  compareAtPrice: {
    type: Number,
    min: 0
  },
  images: [{
    type: String,
    required: [true, 'Please provide at least one product image'],
  }],
  category: {
    type: String,
    required: [true, 'Please provide a product category'],
  },
  brand: {
    type: String,
    required: [true, 'Please provide a product brand'],
  },
  stockQuantity: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    min: [0, 'Stock quantity cannot be negative'],
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
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
    index: true
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
  metadata: {
    title: String,
    description: String,
    keywords: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create text search index
productSchema.index({ name: 'text', description: 'text' });

// Create compound index for efficient sorting and filtering
productSchema.index({ 
  category: 1,
  isActive: 1,
  isFeatured: 1,
  createdAt: -1
});

// Update the updatedAt timestamp before saving
productSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Export the model
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product; 