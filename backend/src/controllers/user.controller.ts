import {NextFunction, Request, Response,  } from "express";
import { User } from "../models/user.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {z} from "zod"
import { AuthRequest } from "../middlewares/auth.middleware";


const signupValidator = z.object({

  firstName: z.string().min(4, "First name must be at least 4 characters"),
  lastName:  z.string().min(2, "Last name must be at least 2 characters"),
  email:     z.string().email("Invalid email address"),
  password:  z.string().min(6, "Password must be at least 6 characters"),

});

const signinValidator = z.object({

    email : z.string().email(),
    password : z.string().min(6)

})

export const  signupController  = async(req : Request,res : Response , next:NextFunction) : Promise<any> => {
    
    const parse = signupValidator.safeParse(req.body);

   
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

    const jwt_token = jwt.sign({ userId : newUser._id},process.env.JWT_SECRET!,{ expiresIn: "1d" });

    return res.status(200).json({
        message : "User signup successfull",
        jwt : jwt_token
    });
   } catch (error) {
        res.status(411).json({errors : "Internal server error"});
   }
};

export const siginController = async(req : Request , res : Response) : Promise<any> =>{

    const parsed = signinValidator.safeParse(req.body);

    if(!parsed.success){

        return res.status(411).json({error : "invalid inputs"});

    }

    const { email , password } = parsed.data;

  try {
    
      const isUserPresent = await User.findOne({email : email});

    if(!isUserPresent){

        return res.status(411).json({error : "User not found"});

    }

    const isPasswordCorrect = await bcrypt.compare(password,isUserPresent.password);

    if(!isPasswordCorrect){

        return res.status(411).json({error : "Wrong password"});

    }

    const jwt_token = jwt.sign({userId : isUserPresent._id},process.env.JWT_SECRET!,{ expiresIn: "1d" });

    return res.status(200).json({message : "sign in successfull" , jwt_token});

  } catch (error) {
    
    res.status(411).json({error : "error while logging in"});

  }
}

const updateInfoValidator = z.object({
    firstName : z.string().min(4).optional(),
    lastName : z.string().min(1).optional(),
    password : z.string().min(6).optional()
})

export const updateUserController = async(req: AuthRequest ,res:Response) : Promise<any> => {

    const parsed = updateInfoValidator.safeParse(req.body);

    if(!parsed.success){

        return res.status(411).json({message : "invalid inputs"});

    }

    const userId = req.userId;
    
    // console.log(userId);

    const {password} = parsed.data;

    if(password){

        const hashedPassword = await bcrypt.hash(password,10);
        parsed.data.password = hashedPassword;

    }

   try {

   const updatedUser =  await User.updateOne({_id : userId},parsed.data);

    // console.log(updatedUser);
    // console.log(parsed.data)

    res.status(200).json({message : "Data updated successfully"});

   } catch (error) {

    res.status(411).json({message : "error updating detailes"});

   }

}