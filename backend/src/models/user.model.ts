import mongoose, { Document, model, Schema } from "mongoose";

interface T extends Document{

    firstName : string,
    lastName : string,
    email : string,
    password : string

}

const userSchema = new Schema<T>({

    firstName : {type : String, required : true},
    lastName : {type : String, required : true},
    email : {type : String, required : true},
    password : {type : String, required : true},

},{timestamps : true});

export const User = model<T>("User",userSchema);
