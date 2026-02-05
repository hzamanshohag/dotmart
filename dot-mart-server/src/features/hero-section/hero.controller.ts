import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { heroService } from './hero.service';

const createHero = catchAsync(async (req: Request, res: Response) => {
  const result = await heroService.createHero(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Hero section created successfully',
    data: result,
  });
});

const getHero = catchAsync(async (_req: Request, res: Response) => {
  const result = await heroService.getActiveHero();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Hero section fetched successfully',
    data: result,
  });
});

const updateHero = catchAsync(async (req: Request, res: Response) => {
  const { heroId } = req.params;

  const result = await heroService.updateHero(heroId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Hero section updated successfully',
    data: result,
  });
});

const deleteHero = catchAsync(async (req: Request, res: Response) => {
  const { heroId } = req.params;

  const result = await heroService.deleteHero(heroId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Hero section deleted successfully',
    data: result,
  });
});

export const heroController = {
  createHero,
  getHero,
  updateHero,
  deleteHero,
};
