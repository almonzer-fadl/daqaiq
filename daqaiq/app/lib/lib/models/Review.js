import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000,
  },
  images: [{
    url: String,
    caption: String,
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  isVerifiedPurchase: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

// Create indexes for faster queries
reviewSchema.index({ product: 1, createdAt: -1 });
reviewSchema.index({ user: 1 });
reviewSchema.index({ rating: 1 });

// Static method to calculate average rating
reviewSchema.statics.calculateAverageRating = async function(productId) {
  const stats = await this.aggregate([
    { $match: { product: productId, status: 'approved' } },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        numReviews: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await mongoose.model('Product').findByIdAndUpdate(productId, {
      averageRating: Math.round(stats[0].averageRating * 10) / 10,
      numReviews: stats[0].numReviews,
    });
  }
};

// Call calculateAverageRating after save
reviewSchema.post('save', function() {
  this.constructor.calculateAverageRating(this.product);
});

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review; 