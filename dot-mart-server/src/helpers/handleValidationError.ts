/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const handleValidationError = (err: any, res: Response) => {
  const issues = Object.values(err.errors).map((item: any) => ({
    path: item.path,
    message: item.message,
  }));

  return res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: 'Validation failed',
    issues,
  });
};
