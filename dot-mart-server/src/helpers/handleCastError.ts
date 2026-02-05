/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const handleCastError = (err: any, res: Response) => {
  return res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: 'Invalid ID format',
    errorDetails: {
      path: err.path,
      value: err.value,
    },
  });
};
