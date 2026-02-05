import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../helpers/AppError';
import { IUser } from './user.interface';
import User from './user.model';

const createUser = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload);
  return result;
};

const getAllUsers = async (query: { page?: number; limit?: number }) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 20;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    User.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
    User.countDocuments(),
  ]);

  return {
    meta: {
      page,
      limit,
      skip,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data,
  };
};


const getSingleUser = async (id: string) => {
  const user = await User.findById(id).populate({
    path: 'cart',
    populate: { path: 'product' },
  });

  return user;
};
const getUserByEmail = async (email: string) => {
  const result = await User.findOne({ email });
  return result;
};

const updateUser = async (id: string, data: IUser) => {
  const result = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return result;
};

const blockUser = async (id: string) => {
  const user = await User.findById(id);

  if (user?.role === 'ADMIN') {
    throw new AppError(StatusCodes.FORBIDDEN, 'Admin users cannot be blocked');
  }

  if (user?.userStatus === 'INACTIVE') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User is already blocked');
  }
  const result = await User.findByIdAndUpdate(
    id,
    { userStatus: 'INACTIVE' },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  return result;
};

const unblockUser = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { userStatus: 'ACTIVE' },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const userService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  blockUser,
  unblockUser,
  deleteUser,
  getUserByEmail,
};
