import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { cartService } from './cart.service';

const addToCart = catchAsync(async (req: Request, res: Response) => {
  const result = await cartService.addToCart(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Product added to cart',
    data: result,
  });
});

const getUserCart = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const result = await cartService.getUserCart(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Cart fetched successfully',
    data: result,
  });
});

const updateCartItem = catchAsync(async (req: Request, res: Response) => {
  const { cartId } = req.params;
  const { quantity } = req.body;

  const result = await cartService.updateCartItem(cartId, quantity);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Cart item updated successfully',
    data: result,
  });
});

const removeCartItem = catchAsync(async (req: Request, res: Response) => {
  const { cartId } = req.params;

  const result = await cartService.removeCartItem(cartId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Cart item removed successfully',
    data: result,
  });
});

const clearUserCart = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  await cartService.clearUserCart(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Cart cleared successfully',
    data: null,
  });
});

export const cartController = {
  addToCart,
  getUserCart,
  updateCartItem,
  removeCartItem,
  clearUserCart,
};
