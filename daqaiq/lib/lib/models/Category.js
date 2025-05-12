import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
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
    trim: true
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  image: {
    type: String
  },
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

// Virtual for subcategories
categorySchema.virtual('subcategories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parentId'
});

// Pre-save hook to generate slug and set level
categorySchema.pre('save', async function(next) {
  if (!this.isModified('name')) return next();
  
  // Generate slug
  this.slug = this.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  // Set level based on parent
  if (this.parentId) {
    const parent = await this.constructor.findById(this.parentId);
    if (parent) {
      this.level = parent.level + 1;
    }
  } else {
    this.level = 1;
  }
  
  this.updatedAt = new Date();
  next();
});

// Method to get full path
categorySchema.methods.getFullPath = async function() {
  const path = [this.name];
  let current = this;
  
  while (current.parentId) {
    current = await this.constructor.findById(current.parentId);
    if (current) {
      path.unshift(current.name);
    } else {
      break;
    }
  }
  
  return path.join(' > ');
};

// Indexes
categorySchema.index({ slug: 1 });
categorySchema.index({ parentId: 1 });
categorySchema.index({ level: 1 });
categorySchema.index({ isActive: 1 });

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category; 