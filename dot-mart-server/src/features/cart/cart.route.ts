import express from 'express';
import { cartController } from './cart.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// user
router.post('/cart', auth('USER','ADMIN'), cartController.addToCart);
router.get('/cart/user/:userId', auth('USER', 'ADMIN'), cartController.getUserCart);
router.put('/cart/:cartId', auth('USER', 'ADMIN'), cartController.updateCartItem);
router.delete('/cart/:cartId', auth('USER', 'ADMIN'), cartController.removeCartItem);
router.delete('/cart/user/:userId', auth('USER', 'ADMIN'), cartController.clearUserCart);

export const CartRoutes = router;
