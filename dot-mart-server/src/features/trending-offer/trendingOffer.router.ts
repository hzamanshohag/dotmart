import express from 'express';
import { trendingOfferController } from './trendingOffer.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/trending-offers', trendingOfferController.getAllTrendingOffers);
router.post('/trending-offers', auth('ADMIN'), trendingOfferController.createTrendingOffer);
router.get(
  '/trending-offers/:offerId',
  auth('ADMIN'),
  trendingOfferController.getSingleTrendingOffer,
);
router.put('/trending-offers/:offerId', auth('ADMIN'), trendingOfferController.updateTrendingOffer);
router.delete(
  '/trending-offers/:offerId',
  auth('ADMIN'),
  trendingOfferController.deleteTrendingOffer,
);

export const TrendingOfferRoutes = router;
