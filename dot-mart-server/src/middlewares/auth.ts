import { NextFunction, Request, Response } from 'express';
import catchAsync from './../utils/catchAsync';
import { AppError } from '../helpers/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRoles } from '../features/user/user.interface';

const auth = (...requiredRoles: TUserRoles[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //get token from headers
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }

    let decoded: JwtPayload;

    // ✅ Verify token safely
    try {
      decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;
    } catch {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }

    // ✅ Role-based authorization
    if (requiredRoles.length && !requiredRoles.includes(decoded.role as TUserRoles)) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        'You do not have permission to access this resource',
      );
    }

    // ✅ Attach user to request
    req.user = decoded;
    next();
  });
};
export default auth;
