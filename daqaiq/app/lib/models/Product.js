import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  name: String,
  values: [String],
});

const specificationSchema = new mongoose.Schema({
  name: String,
  value: String,
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
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
    unique: true,
    sparse: true,
  },
  barcode: String,
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative'],
    default: 0,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  brand: String,
  tags: [String],
  images: [String],
  variants: [variantSchema],
  specifications: [specificationSchema],
  status: {
    type: String,
    enum: ['draft', 'active', 'inactive'],
    default: 'draft',
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Supplier is required'],
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

// Update timestamps on save
productSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Create indexes for faster queries
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ supplier: 1 });
productSchema.index({ status: 1 });

// Don't create the model if it already exists
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product; 