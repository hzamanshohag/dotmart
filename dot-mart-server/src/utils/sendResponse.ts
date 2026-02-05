import { Response } from 'express';

type TSendResponse<T> = {
  status?: boolean;
  statusCode: number;
  message: string;
  data: T | T[] | null;
};

const sendResponse = <T>(res: Response, data: TSendResponse<T>) => {
  res.status(data.statusCode).json({
    status: true,
    statusCode: data.statusCode,
    message: data?.message,
    data: data?.data,
  });
};
export default sendResponse;
