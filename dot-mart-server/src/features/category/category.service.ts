import { StatusCodes } from 'http-status-codes';
import Category from './category.model';
import { ICategory } from './category.interface';
import { AppError } from '../../helpers/AppError';
import { Product } from '../product/product.model';

const createCategory = async (payload: ICategory) => {
  const exists = await Category.findOne({ name: payload.name });

  if (exists) {
    throw new AppError(StatusCodes.CONFLICT, 'Category already exists');
  }

  return Category.create(payload);
};

const getAllCategories = async () => {
  return Category.find().sort({ name: 1 });
};

const getSingleCategory = async (id: string) => {
  const result = await Category.findById(id);

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Category not found');
  }

  return result;
};

const updateCategory = async (id: string, payload: Partial<ICategory>) => {
  const result = await Category.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Category not found');
  }

  return result;
};

const deleteCategory = async (id: string) => {
 const productExists = await Product.exists({ category: id });

 if (productExists) {
   throw new AppError(
     StatusCodes.BAD_REQUEST,
     'This category cannot be deleted because it is associated with existing products.',
   );
 }

 // 🗑️ Delete category
 const result = await Category.findByIdAndDelete(id);

 if (!result) {
   throw new AppError(StatusCodes.NOT_FOUND, 'Category not found');
 }

 return result;
};

export const categoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
