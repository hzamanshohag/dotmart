import { Schema, model} from 'mongoose';
import { IProduct, IProductMeta, ProductBadge } from './product.interface';
const ProductMetaSchema = new Schema<IProductMeta>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    keyword: {
      type: [String],
      required: true,
    },
  },
  { _id: false },
);
const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },

    price: {
      type: Number,
      min: 0,
      required: true,
    },

    originalPrice: {
      type: Number,
      min: 0,
      required: true,
    },

    discount: {
      type: Number,
    },

    images: {
      type: [String],
      required: true,
    },

    badge: {
      type: String,
      enum: Object.values(ProductBadge),
    },

    freeShipping: {
      type: Boolean,
      default: false,
    },

    freeGift: {
      type: Boolean,
      default: false,
    },

    isNewArrivals: {
      type: Boolean,
      default: false,
    },

    isBestDeal: {
      type: Boolean,
      default: false,
    },

    stock: {
      type: Boolean,
      required: true,
    },

    status: {
      type: String,
      enum: ['enable', 'disable'],
      default: 'enable',
    },

    meta: {
      type: ProductMetaSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

ProductSchema.pre('save', async function () {
  if (
    this.originalPrice !== undefined &&
    this.price !== undefined &&
    this.originalPrice > this.price
  ) {
    this.discount = Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  } else {
    this.discount = 0;
  }
});


export const Product = model<IProduct>('Product', ProductSchema);
