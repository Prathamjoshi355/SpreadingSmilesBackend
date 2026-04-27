import mongoose from 'mongoose';
import slug from 'slug';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide blog title'],
      trim: true
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true
    },
    content: {
      type: String,
      required: [true, 'Please provide blog content']
    },
    coverImage: {
      type: String,
      required: [true, 'Please provide cover image URL']
    },
    excerpt: {
      type: String,
      maxlength: 500
    },
    author: {
      type: String,
      default: 'NGO'
    }
  },
  { timestamps: true }
);

// Auto-generate slug before saving
blogSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slug(this.title, { lower: true });
  }
  next();
});

export default mongoose.model('Blog', blogSchema);
