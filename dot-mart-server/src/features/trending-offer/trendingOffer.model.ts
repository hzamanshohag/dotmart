import { model, Schema } from 'mongoose';
import { ITrendingOffer } from './trendingOffer.interface';

const trendingOfferSchema = new Schema<ITrendingOffer>(
  {
    title: {
      type: String,
      required: [true, 'Trending offer title is required'],
      trim: true,
      minlength: [5, 'Title must be at least 5 characters'],
      maxlength: [50, 'Title cannot exceed 50 characters'],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [100, 'Description cannot exceed 100 characters'],
    },

    image: {
      type: String,
      required: [true, 'Offer image is required'],
      validate: {
        validator: function (value: string) {
          return /^(https?:\/\/).+\.(jpg|jpeg|png|webp)$/.test(value);
        },
        message: 'Please provide a valid image URL',
      },
    },

    ctaLink: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'CTA product id is required'],
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    priority: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

const TrendingOffer = model('TrendingOffer', trendingOfferSchema);
export default TrendingOffer;