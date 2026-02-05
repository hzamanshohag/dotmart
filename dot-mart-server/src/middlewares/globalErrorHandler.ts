/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { handleZodError } from '../helpers/handleZodError';
import { handleCastError } from '../helpers/handleCastError';
import { handleValidationError } from '../helpers/handleValidationError';
import { handleDuplicateError } from '../helpers/handleDuplicateError';
import { handleGenericError } from '../helpers/handleGenericError';


// type TErrorResponse = {
//   success: true;
//   message: string;
//   error: any;
// };

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'ZodError') {
    return handleZodError(err, res);
  }

  if (err instanceof mongoose.Error.CastError) {
    return handleCastError(err, res);
  }

  if (err instanceof mongoose.Error.ValidationError) {
    return handleValidationError(err, res);
  }

  if (err.code === 11000) {
    return handleDuplicateError(err, res);
  }

  return handleGenericError(err, res);
};

