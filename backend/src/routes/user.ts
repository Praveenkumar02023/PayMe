import { Request, Response, Router } from "express";
import { siginController, signupController ,updateUserController} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";


const userRouter = Router();

userRouter.post('/signup',signupController);
userRouter.post('/signin',siginController);
userRouter.put('/update',authMiddleware,updateUserController);


export default userRouter;