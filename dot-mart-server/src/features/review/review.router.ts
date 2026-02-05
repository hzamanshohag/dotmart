import express from 'express';
import { reviewController } from './review.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// public
router.get('/reviews', reviewController.getAllReviews);
router.get('/reviews/:reviewId', reviewController.getSingleReview);

// admin only
router.post('/reviews',auth('ADMIN'), reviewController.createReview);
router.put('/reviews/:reviewId', auth('ADMIN'), reviewController.updateReview);
router.put('/reviews/:reviewId/approve',auth('ADMIN'), reviewController.approveReview);
router.delete('/reviews/:reviewId',auth('ADMIN'), reviewController.deleteReview);

export const ReviewRoutes = router;
