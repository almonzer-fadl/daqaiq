import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a category name'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a category description'],
  },
  image: {
    type: String,
    required: [true, 'Please provide a category image'],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  isActive: {
    type: Boolean,
    default: true,
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

// Update the updatedAt timestamp before saving
categorySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Prevent duplicate slugs
categorySchema.pre('save', async function(next) {
  if (this.isModified('name')) {
    let slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    let count = 0;
    let uniqueSlug = slug;

    while (true) {
      const existingCategory = await this.constructor.findOne({ slug: uniqueSlug, _id: { $ne: this._id } });
      if (!existingCategory) {
        this.slug = uniqueSlug;
        break;
      }
      count++;
      uniqueSlug = `${slug}-${count}`;
    }
  }
  next();
});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category; 