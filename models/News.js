import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['TEXT_ONLY', 'IMAGE_ONLY', 'IMAGE_TITLE', 'IMAGE_TITLE_TEXT'],
    required: true
  },
  title: {
    type: String,
    required: function() {
      return this.type !== 'IMAGE_ONLY';
    }
  },
  content: String,
  image: {
    type: String,
    required: function() {
      return ['IMAGE_ONLY', 'IMAGE_TITLE', 'IMAGE_TITLE_TEXT'].includes(this.type);
    }
  },
  alt: String,
  active: {
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

const News = mongoose.models.News || mongoose.model('News', newsSchema);

export default News;
