import { Types } from 'mongoose';

export interface ITrendingOffer {
  title: string;
  description?: string;
  image: string;
  ctaLink: Types.ObjectId; // productId
  isActive: boolean;
  priority: number;
}
