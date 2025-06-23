import mongoose, { Document, Schema, Types ,model } from 'mongoose'

interface Account extends Document{

    userId : Types.ObjectId,
    balance : number 

}

const accountSchema = new Schema<Account>({

    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    balance : {
        type : Number,
        default : 0, 
        required : true
    }


},{timestamps : true});

export const Account = model<Account>('Account',accountSchema);