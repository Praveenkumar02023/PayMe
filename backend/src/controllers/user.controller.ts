import {NextFunction, Request, Response,  } from "express";
import { userValidator } from "../validators/user.validator";
import { User } from "../models/user.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const  signupController  = async(req : Request,res : Response , next:NextFunction) : Promise<any> => {

    const parse = userValidator.safeParse(req.body);

    if(!parse.success){

       return res.status(411).json({errors : 
            parse.error.format()
        })

    }

    const {firstName , lastName , email , password} = parse.data;

    const isUserPresent = await User.findOne({email : email}).select("-password");
    
    if(isUserPresent){

        return res.status(411).json({error : "User already present with this email."});

    }

   try {
     const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await new User({
        firstName : firstName,
        lastName : lastName,
        email : email,
        password : hashedPassword
    });

    await newUser.save();

    const jwt_token = jwt.sign({ userId : newUser._id},process.env.JWT_SECRET!);

    return res.status(200).json({
        message : "User signup successfull",
        jwt : jwt_token
    });
   } catch (error) {
        res.status(411).json({errors : "Internal server error"});
   }
};