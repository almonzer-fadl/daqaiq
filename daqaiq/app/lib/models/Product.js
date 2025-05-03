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
    unique: true
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
  compareAtPrice: {
    type: Number,
    min: 0
  },
  cost: {
    type: Number,
    min: 0
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
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  lowStockThreshold: {
    type: Number,
    default: 5
  },
  category: {
    type: String,
    required: true
  },
  categorySlug: {
    type: String,
    required: true
  },
  subcategory: {
    type: String
  },
  subcategorySlug: {
    type: String
  },
  brand: String,
  tags: [String],
  images: [String],
  status: {
    type: String,
    enum: ['draft', 'active', 'inactive'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for stock status
productSchema.virtual('stockStatus').get(function() {
  if (this.stock <= 0) return 'out_of_stock';
  if (this.stock <= this.lowStockThreshold) return 'low_stock';
  return 'in_stock';
});

// Pre-save hook to generate slug
productSchema.pre('save', function(next) {
  if (!this.isModified('name')) return next();
  
  this.slug = this.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
    
  next();
});

// Method to check if stock is low
productSchema.methods.isLowStock = function() {
  return this.stock <= this.lowStockThreshold;
};

// Method to update stock
productSchema.methods.updateStock = async function(quantity, type = 'set') {
  switch (type) {
    case 'increase':
      this.stock += quantity;
      break;
    case 'decrease':
      this.stock = Math.max(0, this.stock - quantity);
      break;
    case 'set':
      this.stock = Math.max(0, quantity);
      break;
  }
  return this.save();
};

// Indexes
productSchema.index({ slug: 1 });
productSchema.index({ categorySlug: 1 });
productSchema.index({ subcategorySlug: 1 });
productSchema.index({ supplier: 1 });
productSchema.index({ status: 1 });
productSchema.index({ featured: 1 });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product; 