import express from 'express';
import { categoryController } from './category.controller';
import auth from './../../middlewares/auth';

const router = express.Router();

// public
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:categoryId', categoryController.getSingleCategory);

// admin only
router.post('/categories', auth('ADMIN'), categoryController.createCategory);
router.put('/categories/:categoryId', auth('ADMIN'), categoryController.updateCategory);
router.delete('/categories/:categoryId', auth('ADMIN'), categoryController.deleteCategory);

export const CategoryRoutes = router;
