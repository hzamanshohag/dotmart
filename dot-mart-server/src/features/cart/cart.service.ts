import { StatusCodes } from 'http-status-codes';
import Cart from './cart.model';
import { ICart } from './cart.interface';
import { AppError } from '../../helpers/AppError';
import mongoose from 'mongoose';
import User from '../user/user.model';

const addToCart = async (payload: ICart) => {
  const exists = await Cart.findOne({
    user: payload.user,
    product: payload.product,
  });

  // ✅ If already exists → update quantity
  if (exists) {
    exists.quantity += payload.quantity;
    const updated = await exists.save();

    // ✅ Ensure cart reference exists in user.cart
    await User.findByIdAndUpdate(payload.user, {
      $addToSet: { cart: updated._id }, // ✅ prevent duplicates
    });

    return updated;
  }

  // ✅ Create new cart item
  const cartItem = await Cart.create(payload);

  // ✅ Push cart item id into user.cart
  await User.findByIdAndUpdate(payload.user, {
    $addToSet: { cart: cartItem._id },
  });

  return cartItem;
};

const getUserCart = async (userId: string) => {
  const cartItems = await Cart.find({
    user: new mongoose.Types.ObjectId(userId),
  }).populate('product', 'name images price stock');

  const itemsWithTotal = cartItems.map((item: any) => {
    const itemTotal = item.product.price * item.quantity;

    return {
      ...item.toObject(),
      itemTotal,
    };
  });

  const cartTotal = itemsWithTotal.reduce((sum, item) => sum + item.itemTotal, 0).toFixed(2);

  return {
    items: itemsWithTotal,
    cartTotal,
  };
};


const updateCartItem = async (cartId: string, quantity: number) => {
  if (quantity < 1) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Quantity must be at least 1');
  }

  const result = await Cart.findByIdAndUpdate(cartId, { quantity }, { new: true });

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Cart item not found');
  }

  return result;
};

const removeCartItem = async (cartId: string) => {
  const result = await Cart.findByIdAndDelete(cartId);

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Cart item not found');
  }

  return result;
};

const clearUserCart = async (userId: string) => {
  await Cart.deleteMany({ user: userId });
};

export const cartService = {
  addToCart,
  getUserCart,
  updateCartItem,
  removeCartItem,
  clearUserCart,
};
