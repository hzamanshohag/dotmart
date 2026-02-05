import { Schema, model } from 'mongoose';
import { IHero } from './hero.interface';

const heroImageSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => /^(https?:\/\/).+\.(jpg|jpeg|png|webp)$/.test(v),
        message: 'Invalid image URL',
      },
    },
    alt: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const heroSchema = new Schema<IHero>(
  {
    carouselImages: {
      type: [heroImageSchema],
      required: true,
    },

    sideImages: {
      type: [heroImageSchema],
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);


const Hero = model<IHero>('Hero', heroSchema);
export default Hero;
