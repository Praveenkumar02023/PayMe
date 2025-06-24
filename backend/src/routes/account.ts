import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getBalance ,transferMoney } from "../controllers/account.controller";



export const accountRouter = Router();

accountRouter.get('/balance',authMiddleware,getBalance);
accountRouter.post('/transfer',authMiddleware,transferMoney);
