import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import os from 'os';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import cookieParser from 'cookie-parser';
import userRouter from './features/user/user.router';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFoundHandler';
import { TrendingOfferRoutes } from './features/trending-offer/trendingOffer.router';
import { ReviewRoutes } from './features/review/review.router';
import { HeroRoutes } from './features/hero-section/hero.route';
import { CategoryRoutes } from './features/category/category.route';
import { ProductRoutes } from './features/product/product.route';
import { OrderRoutes } from './features/order/order.route';
import { CartRoutes } from './features/cart/cart.route';
import { authRoutes } from './features/auth/auth.route';

const app:Application = express();

// Middleware
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://dotmart.vercel.app'],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());


// Test route
app.get('/', (req: Request, res: Response) => {
  const currentDateTime = new Date().toISOString();
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const serverHostname = os.hostname();
  const serverPlatform = os.platform();
  const serverUptime = os.uptime();

  const dbState = mongoose.connection.readyState;

  const dbStatusMap: Record<number, string> = {
    0: '❌ Disconnected',
    1: '✅ Connected',
    2: '⏳ Connecting',
    3: '⚠️ Disconnecting',
  };

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Welcome to the Love & Gift Corner',
    version: '1.0.0',
    clientDetails: {
      ipAddress: clientIp,
      accessedAt: currentDateTime,
    },
    serverDetails: {
      hostname: serverHostname,
      platform: serverPlatform,
      uptime: `${Math.floor(serverUptime / 60 / 60)} hours ${Math.floor(
        (serverUptime / 60) % 60,
      )} minutes`,
    },
    database: {
      readyState: dbState,
      status: dbStatusMap[dbState] || 'Unknown',
    },
    developerContact: {
      name: 'Md Hasanuzzaman Shohag',
      contact: '+880 1312-116844',
      linkedin: 'https://www.linkedin.com/in/hzaman-shohag/',
    },
  });
});


// Routes
app.use('/api/v1', HeroRoutes);
app.use('/api/v1', CategoryRoutes);
app.use('/api/v1', TrendingOfferRoutes);
app.use('/api/v1', ProductRoutes);
app.use('/api/v1', userRouter);
app.use('/api/v1', OrderRoutes);
app.use('/api/v1', ReviewRoutes);
app.use('/api/v1', CartRoutes);
app.use('/api/v1/auth', authRoutes);



// Not Found
app.use(notFound);

// Error Handler
app.use(globalErrorHandler);

export default app;
