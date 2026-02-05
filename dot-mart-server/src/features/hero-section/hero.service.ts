import { StatusCodes } from 'http-status-codes';
import Hero from './hero.model';
import { IHero } from './hero.interface';
import { AppError } from '../../helpers/AppError';

const createHero = async (payload: IHero) => {
  const existing = await Hero.findOne();

  if (existing) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Hero already exists');
  }

  return Hero.create(payload);
};


const getActiveHero = async () => {
  const result = await Hero.find();

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Hero section not found');
  }

  return result;
};

const updateHero = async (id: string, payload: Partial<IHero>) => {
  const result = await Hero.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Hero section not found');
  }

  return result;
};

const deleteHero = async (id: string) => {
  const result = await Hero.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Hero section not found');
  }

  return result;
};

export const heroService = {
  createHero,
  getActiveHero,
  updateHero,
  deleteHero,
};
