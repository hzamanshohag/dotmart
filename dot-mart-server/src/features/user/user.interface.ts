import { Types } from 'mongoose';
import { USER_ROLES } from './user.constant';

export interface IUser {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  photoUrl?: string;
  role?: 'USER' | 'ADMIN';
  userStatus?: 'ACTIVE' | 'INACTIVE';
  cart?: Types.ObjectId[]; // ref Cart
  orderHistory?: Types.ObjectId[];
}
export type TUserRoles = (typeof USER_ROLES)[keyof typeof USER_ROLES];

