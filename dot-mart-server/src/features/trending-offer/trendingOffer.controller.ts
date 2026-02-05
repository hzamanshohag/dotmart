import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { trendingOfferService } from './trendingOffer.service';

const createTrendingOffer = catchAsync(async (req: Request, res: Response) => {
  const result = await trendingOfferService.createTrendingOffer(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Trending offer created successfully',
    data: result,
  });
});

const getAllTrendingOffers = catchAsync(async (req: Request, res: Response) => {
  const result = await trendingOfferService.getAllTrendingOffers();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Trending offers fetched successfully',
    data: result,
  });
});

const getSingleTrendingOffer = catchAsync(async (req: Request, res: Response) => {
  const { offerId } = req.params;

  const result = await trendingOfferService.getSingleTrendingOffer(offerId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Trending offer fetched successfully',
    data: result,
  });
});

const updateTrendingOffer = catchAsync(async (req: Request, res: Response) => {
  const { offerId } = req.params;

  const result = await trendingOfferService.updateTrendingOffer(offerId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Trending offer updated successfully',
    data: result,
  });
});

const deleteTrendingOffer = catchAsync(async (req: Request, res: Response) => {
  const { offerId } = req.params;

  const result = await trendingOfferService.deleteTrendingOffer(offerId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Trending offer deleted successfully',
    data: result,
  });
});

export const trendingOfferController = {
  createTrendingOffer,
  getAllTrendingOffers,
  getSingleTrendingOffer,
  updateTrendingOffer,
  deleteTrendingOffer,
};
