import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export interface AuthRequest extends Request{
    userId? : string
}

export const authMiddleware = (req : AuthRequest , res : Response , next : NextFunction) : any =>{

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){

        return res.status(403).json({error : "jwt token not found"});

    }
    
    const token = authHeader.split(' ')[1];
    // console.log(token);

   try {
    
    const decoded = jwt.verify(token,process.env.JWT_SECRET!) as {userId : string};

    req.userId = decoded.userId;
    // console.log("nezt");
        
    next();

   } catch (error) {
    // console.log("error")
    res.status(403).json({error : "error decoding token"});
    
   }

}