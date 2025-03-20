import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative'],
  },
  compareAtPrice: {
    type: Number,
    min: [0, 'Compare at price cannot be negative'],
  },
  cost: {
    type: Number,
    min: [0, 'Cost cannot be negative'],
  },
  sku: {
    type: String,
    trim: true,
    sparse: true,
    unique: true,
  },
  barcode: {
    type: String,
    trim: true,
    sparse: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide quantity'],
    min: [0, 'Quantity cannot be negative'],
    default: 0,
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    trim: true,
  },
  brand: {
    type: String,
    trim: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  images: [{
    type: String,
  }],
  variants: [{
    name: String,
    values: [String],
    price: Number,
    quantity: Number,
    sku: String,
  }],
  specifications: [{
    name: String,
    value: String,
  }],
  status: {
    type: String,
    enum: ['draft', 'active', 'inactive'],
    default: 'draft',
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  salesCount: {
    type: Number,
    default: 0,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Create indexes for faster queries
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ supplier: 1 });
productSchema.index({ status: 1 });
productSchema.index({ sku: 1 });
productSchema.index({ isDeleted: 1 });

// Add a compound index for category and status
productSchema.index({ category: 1, status: 1 });

// Virtual for URL-friendly slug
productSchema.virtual('slug').get(function() {
  return this.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
});

// Method to check if product is in stock
productSchema.methods.isInStock = function() {
  return this.quantity > 0;
};

// Method to update stock
productSchema.methods.updateStock = function(quantity) {
  this.quantity += quantity;
  return this.save();
};

// Method to check if product is on sale
productSchema.methods.isOnSale = function() {
  return this.compareAtPrice > this.price;
};

// Calculate discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (!this.compareAtPrice || this.compareAtPrice <= this.price) return 0;
  return Math.round(((this.compareAtPrice - this.price) / this.compareAtPrice) * 100);
});

// Calculate profit margin
productSchema.virtual('profitMargin').get(function() {
  if (!this.cost || this.cost <= 0) return 0;
  return Math.round(((this.price - this.cost) / this.price) * 100);
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product; 