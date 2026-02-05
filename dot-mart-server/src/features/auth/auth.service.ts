import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../helpers/AppError';
import User from '../user/user.model';
import { ILoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;
  //check user exists with the given email
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  // check user is active
  if (user.userStatus !== 'ACTIVE') {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'Your account is not active. Please contact support.',
    );
  }

  // verify password
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Password is incorrect');
  }

  // create access token & send to client

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessTokenExpiresIn =
    (process.env.JWT_ACCESS_EXPIRATION_TIME as `${number}${'s' | 'm' | 'h' | 'd'}` | undefined) ??
    '10d';

  const refreshTokenExpiresIn =
    (process.env.JWT_REFRESH_EXPIRATION_TIME as `${number}${'s' | 'm' | 'h' | 'd'}` | undefined) ??
    '90d';

  const accessToken = jwt.sign(jwtPayload, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: accessTokenExpiresIn,
  });

  const refreshToken = jwt.sign(jwtPayload, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: refreshTokenExpiresIn,
  });

  return { accessToken, refreshToken };
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Refresh token is missing');
  }

  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);

  const jwtPayload = {
    email: (decoded as any).email,
    role: (decoded as any).role,
  };

  const accessTokenExpiresIn =
    (process.env.JWT_ACCESS_EXPIRATION_TIME as `${number}${'s' | 'm' | 'h' | 'd'}` | undefined) ??
    '10d';

  const accessToken = jwt.sign(jwtPayload, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: accessTokenExpiresIn,
  });

  return { accessToken };
};

export const authService = {
  loginUser,
  refreshToken,
};
