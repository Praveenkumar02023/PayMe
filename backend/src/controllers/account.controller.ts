import { Request, Response } from "express";
import {number, z} from 'zod';
import { AuthRequest } from "../middlewares/auth.middleware";
import { Account } from "../models/account.model";
import { User } from "../models/user.model";
import mongoose, { mongo } from "mongoose";



export const getBalance = async(req : AuthRequest , res : Response) : Promise<any> =>{

    const userId = req.userId;

    try {
        
        const account = await Account.findOne({userId : userId});

        res.status(200).json({balance : account?.balance});

    } catch (error) {
        res.status(400).json({message : "account not found"});
    }

}

const transferValidator = z.object({
    to : z.string(),
    amount : z.number().min(1 , "Min 1 rupees required for transfer")
})

export const transferMoney = async(req : AuthRequest , res : Response) : Promise<any> =>{

    const parsed = transferValidator.safeParse(req.body);

    if(!parsed.success){

        return res.status(400).json({message : "invalid inputs"});

    }

    const session = await mongoose.startSession();
    
    try {
    session.startTransaction();
    const userId = req.userId;
    const {to , amount} = parsed.data;
    
    
    const account = await Account.findOne({userId}).session(session);
    const recieverAccount = await Account.findOne({userId : to}).session(session);
    
    if(!account || !recieverAccount){

        throw new Error("Invalid account details");

    }

    if(amount > account?.balance!){

        throw new Error('Insufficient balance');

    }

    //transfer 
    account.balance -= amount;
    recieverAccount.balance += amount;

    await account.save({session});
    await recieverAccount.save({session});

    await session.commitTransaction();
    res.status(200).json({message : "transaction successfull"});

    } catch (error) {
        
        await session.abortTransaction();
        res.status(400).json({ message: error instanceof Error ? error.message : "Something went wrong" });

    }finally{

        session.endSession();

    }   

}
