import express from "express"
import { connectDB } from "./db/db";
import rootRouter from "./routes";
import { Request , Response } from "express";
import cors from "cors"

const app = express();

app.post('/api/v1',rootRouter);

app.use(cors({
    origin : "http://localhost:5173/",
    credentials : true
}));

app.use(express.json());
 
app.listen(8000,()=>{

    connectDB();

});