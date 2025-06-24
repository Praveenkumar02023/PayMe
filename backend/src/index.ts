import express from "express"
import { connectDB } from "./db/db";
import rootRouter from "./routes";
import cors from "cors"
import cookieParser from 'cookie-parser'

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // Allow cookies to be sent
}));

app.use(cookieParser());

app.use('/api/v1',rootRouter);


 
app.listen(8000,()=>{

    connectDB();

});