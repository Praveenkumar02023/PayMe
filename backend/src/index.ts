import express from "express"
import { connectDB } from "./db/db";
import rootRouter from "./routes";
import { Request , Response } from "express";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1',rootRouter);


 
app.listen(8000,()=>{

    connectDB();

});