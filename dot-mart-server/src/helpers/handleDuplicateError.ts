import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const handleDuplicateError = (err: any, res: Response) => {
  const field = Object.keys(err.keyValue)[0];

  return res.status(StatusCodes.CONFLICT).json({
    success: false,
    message: `${field} already exists`,
    errorDetails: {
      field,
      value: err.keyValue[field],
    },
  });
};
