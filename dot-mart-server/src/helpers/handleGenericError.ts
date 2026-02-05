/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const handleGenericError = (err: any, res: Response) => {
  const isDev = process.env.NODE_ENV === 'development';

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(isDev && {
      stack: err.stack,
    }),
  });
};
