import { Schema, model } from 'mongoose';
import { ICategory } from './category.interface';

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      unique: true,
      minlength: [2, 'Category name must be at least 2 characters'],
      maxlength: [50, 'Category name cannot exceed 50 characters'],
    },

    photo: {
      type: String,
      required: [true, 'Category photo is required'],
      validate: {
        validator: function (value: string) {
          return /^(https?:\/\/).+\.(jpg|jpeg|png|webp)$/.test(value);
        },
        message: 'Please provide a valid photo URL',
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Category = model<ICategory>('Category', categorySchema);
export default Category;
