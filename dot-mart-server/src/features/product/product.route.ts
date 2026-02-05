import express from 'express';
import auth from '../../middlewares/auth';
import { productController } from './product.controller';

const router = express.Router();

// public routes
router.get('/products',productController.getAllProducts);
router.get('/products/:slug', productController.getSingleProductBySlug);
router.get('/product/:id', productController.getSingleProduct);

// admin routes
router.post('/products', auth('ADMIN'), productController.createProduct);
router.get('/products', auth('ADMIN'), productController.getAllProducts);

router.put('/products/:productId', auth('ADMIN'), productController.updateProduct);
router.delete('/products/:productId', auth('ADMIN'), productController.deleteProduct);

export const ProductRoutes = router;
