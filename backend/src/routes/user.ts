import { Request, Response, Router } from "express";
import { signupController } from "../controllers/user.controller";


const userRouter = Router();

userRouter.post("/signup",signupController);

export default userRouter;