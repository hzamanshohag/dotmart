import { Schema, model } from 'mongoose';
import { IReview } from './review.interface';

const reviewSchema = new Schema<IReview>(
  {
    name: {
      type: String,
      required: [true, 'Reviewer name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    userImage: {
      type: String,
      required: [true, 'User image is required'],
      validate: {
        validator: function (value: string) {
          return /^(https?:\/\/).+\.(jpg|jpeg|png|webp)$/.test(value);
        },
        message: 'Please provide a valid image URL',
      },
      default: 'https://example.com/photos/johndoe.jpg',
    },

    social: {
      platform: {
        type: String,
        enum: ['twitter', 'facebook', 'linkedin', 'instagram', 'Youtube'],
        required: [true, 'Social platform is required'],
      },
    },

    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },

    text: {
      type: String,
      required: [true, 'Review text is required'],
      trim: true,
      minlength: [10, 'Review must be at least 10 characters'],
      maxlength: [500, 'Review cannot exceed 500 characters'],
    },

    isApproved: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Review = model<IReview>('Review', reviewSchema);
export default Review;
