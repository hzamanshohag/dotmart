import { Request, Response } from 'express';
import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await userService.createUser(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'User Create Successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllUsers(req.query);
  console.log(req.cookies);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'All users fetched successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
   const { userId } = req.params;
  const result = await userService.getSingleUser(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User fetched successfully',
    data: result,
  });
});

const getUserByEmail = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const result = await userService.getUserByEmail(email);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User fetched successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const result = await userService.updateUser(userId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User updated successfully',
    data: result,
  });
});

const blockUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const result = await userService.blockUser(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User blocked successfully',
    data: result,
  });
});

const unblockUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const result = await userService.unblockUser(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User unblocked successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const result = await userService.deleteUser(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User deleted successfully',
    data: result,
  });
});

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  blockUser,
  unblockUser,
  deleteUser,
  getUserByEmail,
};
