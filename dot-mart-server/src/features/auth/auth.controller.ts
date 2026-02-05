import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);
  const { accessToken, refreshToken } = result;

  // Set HttpOnly cookie for access token
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
  });

  // Set HttpOnly cookie for refresh token
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User logged in successfully',
    data: { accessToken },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.refreshToken(req.cookies.refreshToken);

  // Here you would implement the logic to refresh the access token
  // For example, verify the refresh token and generate a new access token

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Refresh token processed successfully',
    data: result,
  });
});

export const authController = {
  loginUser,
  refreshToken,
};
