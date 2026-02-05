import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { reviewService } from './review.service';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewService.createReview(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Review submitted successfully',
    data: result,
  });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewService.getAllReviews(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Reviews fetched successfully',
    data: result,
  });
});

const getSingleReview = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.params;

  const result = await reviewService.getSingleReview(reviewId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Review fetched successfully',
    data: result,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.params;

  const result = await reviewService.updateReview(reviewId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Review updated successfully',
    data: result,
  });
});


const approveReview = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.params;

  const result = await reviewService.approveReview(reviewId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Review approved successfully',
    data: result,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.params;

  const result = await reviewService.deleteReview(reviewId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Review deleted successfully',
    data: result,
  });
});

export const reviewController = {
  createReview,
  getAllReviews,
  getSingleReview,
  approveReview,
  deleteReview,
  updateReview,
};
