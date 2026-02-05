import { NextFunction, Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';

const catchAsync = (func: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch((error) => next(error));
  };
};
export default catchAsync;
