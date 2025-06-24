import { Request, Response, Router } from "express";
import { siginController, signupController ,updateUserController , getUserByName} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";


const userRouter = Router();

userRouter.post('/signup',signupController);
userRouter.post('/signin',siginController);
userRouter.put('/update',authMiddleware,updateUserController);
userRouter.post('/bulk',authMiddleware,getUserByName);

export default userRouter;