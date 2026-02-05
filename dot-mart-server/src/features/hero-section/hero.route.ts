import express from 'express';
import { heroController } from './hero.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// public
router.get('/hero', heroController.getHero);

// admin only
router.post('/hero', auth('ADMIN'), heroController.createHero);
router.put('/hero/:heroId', auth('ADMIN'), heroController.updateHero);
router.delete('/hero/:heroId', auth('ADMIN'), heroController.deleteHero);

export const HeroRoutes = router;
