import { StatusCodes } from 'http-status-codes';
import TrendingOffer from './trendingOffer.model';
import { ITrendingOffer } from './trendingOffer.interface';
import { AppError } from '../../helpers/AppError';

const createTrendingOffer = async (payload: ITrendingOffer) => {
  const result = await TrendingOffer.create(payload);
  return result;
};

const getAllTrendingOffers = async () => {
  const result = await TrendingOffer.find();
  return result;
};

const getSingleTrendingOffer = async (id: string) => {
  const result = await TrendingOffer.findById(id);

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Trending offer not found');
  }

  return result;
};

const updateTrendingOffer = async (id: string, payload: Partial<ITrendingOffer>) => {
  const result = await TrendingOffer.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Trending offer not found');
  }

  return result;
};

const deleteTrendingOffer = async (id: string) => {
  const result = await TrendingOffer.findByIdAndUpdate(id, { isActive: false }, { new: true });

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Trending offer not found');
  }

  return result;
};

export const trendingOfferService = {
  createTrendingOffer,
  getAllTrendingOffers,
  getSingleTrendingOffer,
  updateTrendingOffer,
  deleteTrendingOffer,
};
