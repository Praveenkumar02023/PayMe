import express from "express"
import { connectDB } from "./utils/db";

const app = express();

app.listen(8000,()=>{

    connectDB();

});