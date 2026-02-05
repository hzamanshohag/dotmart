import { Types } from 'mongoose';

export type PaymentStatus = 'pending' | 'paid' | 'failed';
export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface IOrderItem {
  product: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder {
  user: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
}
