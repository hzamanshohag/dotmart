import { StatusCodes } from 'http-status-codes';
import { IReview } from './review.interface';
import { AppError } from '../../helpers/AppError';
import Review from './review.model';

const createReview = async (payload: IReview) => {
  const result = await Review.create(payload);
  return result;
};

const getAllReviews = async (query: { page?: number; limit?: number }) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 20;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Review.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Review.countDocuments(),
  ]);

  return {
    meta: {
      page,
      limit,
      skip,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data,
  };
};


const getSingleReview = async (id: string) => {
  const result = await Review.findById(id);

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Review not found');
  }

  return result;
};

const approveReview = async (id: string) => {
  const result = await Review.findByIdAndUpdate(id, { isApproved: true }, { new: true });

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Review not found');
  }

  return result;
};
const updateReview = async (id: string, payload: Partial<IReview>) => {
  const result = await Review.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Review not found');
  }

  return result;
};


const deleteReview = async (id: string) => {
  const result = await Review.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Review not found');
  }

  return result;
};

export const reviewService = {
  createReview,
  getAllReviews,
  getSingleReview,
  approveReview,
  deleteReview,
  updateReview,
};
