import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { productService } from './product.service';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.createProduct(req.body);
 
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Product created successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.getAllProducts(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Products fetched successfully',
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
 const { id } = req.params;

  const result = await productService.getSingleProduct(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Product fetched successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;

  const result = await productService.updateProduct(productId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Product updated successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;

  const result = await productService.deleteProduct(productId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Product disabled successfully',
    data: result,
  });
});

const getSingleProductBySlug = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;

  const result = await productService.getSingleProductBySlug(slug);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Product fetched successfully',
    data: result,
  });
});

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getSingleProductBySlug,
};
