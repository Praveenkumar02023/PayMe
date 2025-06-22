import express from "express"
import { connectDB } from "./db/db";

const app = express();

app.listen(8000,()=>{

    connectDB();

});