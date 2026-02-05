import { Schema, model } from 'mongoose';
import { ICart } from './cart.interface';

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

// prevent duplicate product for same user
cartSchema.index({ user: 1, product: 1 }, { unique: true });

const Cart = model<ICart>('Cart', cartSchema);
export default Cart;
