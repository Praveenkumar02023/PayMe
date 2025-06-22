import { Router } from "express";
import userRouter from "./user";



const router = Router();

router.post('/user',userRouter)

export default router;