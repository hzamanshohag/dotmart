import { StatusCodes } from 'http-status-codes';

import { IProduct } from './product.interface';
import { AppError } from '../../helpers/AppError';
import { Product } from './product.model';
import mongoose from 'mongoose';

interface ProductQuery {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Create Product
 */
const createProduct = async (payload: IProduct) => {
  return Product.create(payload);
};

/**
 * Get All Products (Search + Filter + Pagination)
 */


const getAllProducts = async (query: ProductQuery) => {
  const search = query.search;
  const category = query.category;

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 20;
  const sortOrder: 'asc' | 'desc' = query.sortOrder === 'desc' ? 'desc' : 'asc';

  const matchStage: any = {
    status: { $ne: 'disable' },
  };

  // 🔍 Search by product name
  if (search) {
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    matchStage.$or = [{ name: { $regex: escapedSearch, $options: 'i' } }];
  }

  // 🆔 Filter by CATEGORY ID (before lookup)
  const isCategoryObjectId = category && mongoose.Types.ObjectId.isValid(category);

  if (isCategoryObjectId) {
    matchStage.category = new mongoose.Types.ObjectId(category);
  }

  const skip = (page - 1) * limit;
  const sortDirection = sortOrder === 'desc' ? -1 : 1;

  const pipeline: any[] = [
    { $match: matchStage },

    // 🔗 Join categories
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    { $unwind: '$category' },
  ];

  // 🏷️ Filter by CATEGORY NAME (after lookup)
  if (category && !isCategoryObjectId) {
    pipeline.push({
      $match: {
        'category.name': {
          $regex: `^${category}$`,
          $options: 'i',
        },
      },
    });
  }

  // ✅ Sort + Pagination (now limit is number ✅)
  pipeline.push({ $sort: { 'category.name': sortDirection } }, { $skip: skip }, { $limit: limit });

  const data = await Product.aggregate(pipeline);

  // ✅ Count Pipeline (remove skip/limit/sort)
  const countPipeline = pipeline.filter((stage) => !stage.$skip && !stage.$limit && !stage.$sort);

  countPipeline.push({ $count: 'total' });

  const countResult = await Product.aggregate(countPipeline);
  const total = countResult[0]?.total || 0;

  return {
    meta: {
      page,
      limit,
      total,
      sortOrder,
      totalPages: Math.ceil(total / limit),
    },
    data,
  };
};




/**
 * Get Single Product by ID
 */
const getSingleProduct = async (id: string) => {
  // ✅ Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid product id');
  }

  const product = await Product.findById(id).populate('category', 'name photo');

  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
  }

  return product;
};

/**
 * Get Single Product by Slug (Public)
 */
const getSingleProductBySlug = async (slug: string) => {
  const product = await Product.findOne({
    slug,
    status: { $ne: 'disable' },
  }).populate('category', 'name photo');

  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
  }

  return product;
};

/**
 * Update Product
 */
const updateProduct = async (id: string, payload: Partial<IProduct>) => {
  const product = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
  }

  return product;
};

/**
 * Soft Delete Product
 */
const deleteProduct = async (id: string) => {
  const product = await Product.findByIdAndUpdate(id, { status: 'disable' }, { new: true });

  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
  }

  return product;
};

export const productService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  getSingleProductBySlug,
  updateProduct,
  deleteProduct,
};
