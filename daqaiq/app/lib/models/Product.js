import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
  },
  discountPercentage: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  categorySlug: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
    required: true,
  }],
  features: [{
    type: String,
  }],
  specifications: {
    type: Map,
    of: String,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  badge: {
    type: String,
  },
  badgeColor: {
    type: String,
  },
  freeShipping: {
    type: Boolean,
    default: false,
  },
  shippingText: {
    type: String,
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

// Create text indexes for search
productSchema.index({ name: 'text', description: 'text' });

// Create compound index for category and subcategory
productSchema.index({ category: 1, subcategory: 1 });

// Update the updatedAt field on save
productSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product; 