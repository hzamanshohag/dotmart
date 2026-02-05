import { Router } from 'express';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';

const userRouter = Router();

// localhost:5000/api/v1/user/userId

userRouter.post('/create-user', userController.createUser);
userRouter.get('/users', auth('ADMIN','USER'), userController.getAllUsers);
userRouter.get('/users/:email', auth('ADMIN', 'USER'), userController.getUserByEmail);
userRouter.get('/user/:userId', auth('ADMIN', 'USER'), userController.getSingleUser);

userRouter.put('/user/:userId', auth('ADMIN', 'USER'), userController.updateUser);
userRouter.put('/user/block/:userId', auth('ADMIN'), userController.blockUser);
userRouter.put('/user/unblock/:userId', auth('ADMIN'), userController.unblockUser);
userRouter.delete('/user/:userId', auth('ADMIN'), userController.deleteUser);

export default userRouter;
