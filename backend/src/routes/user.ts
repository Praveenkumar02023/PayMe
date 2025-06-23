import { Request, Response, Router } from "express";
import { siginController, signupController } from "../controllers/user.controller";


const userRouter = Router();

userRouter.post('/signup',signupController);
userRouter.post('/signin',siginController);

export default userRouter;