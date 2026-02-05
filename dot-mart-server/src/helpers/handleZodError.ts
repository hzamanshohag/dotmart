/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const handleZodError = (err: any, res: Response) => {
  const issues = err.issues.map((item: any) => ({
    path: item.path.join('.'),
    message: item.message,
  }));

  return res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: 'Validation failed',
    issues,
  });
};
