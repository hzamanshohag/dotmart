import { StatusCodes } from 'http-status-codes';
import Order from './order.model';
import { IOrder } from './order.interface';
import { AppError } from '../../helpers/AppError';
import User from '../user/user.model';

const createOrder = async (payload: IOrder) => {
const order = await Order.create(payload);

// ✅ Push order._id into user.orderHistory
await User.findByIdAndUpdate(payload.user, {
  $push: { orderHistory: order._id },
});

return order;
};

const getAllOrders = async () => {
  return Order.find().populate('user', 'name email').populate('items.product', 'name images price');
};

const getSingleOrder = async (id: string) => {
  const result = await Order.findById(id)
    .populate('user', 'name email')
    .populate('items.product', 'name images price');

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
  }

  return result;
};

const getUserOrders = async (userId: string) => {
  return Order.find({ user: userId })
    .populate('items.product', 'name images price')
    .sort({ createdAt: -1 });
};

const updateOrderStatus = async (id: string, status: string) => {
  const result = await Order.findByIdAndUpdate(id, { orderStatus: status }, { new: true });

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
  }

  return result;
};

const updatePaymentStatus = async (id: string, status: string) => {
  const result = await Order.findByIdAndUpdate(id, { paymentStatus: status }, { new: true });

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
  }

  return result;
};

export const orderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getUserOrders,
  updateOrderStatus,
  updatePaymentStatus,
};
