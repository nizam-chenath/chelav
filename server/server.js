import express from 'express';
import mongoose from "mongoose";

import cors from 'cors'



const PORT = 4000
const app = express();

app.use(cors) //used because of adding datas in to database from react

mongoose.set('strictQuery', false)

await mongoose.connect("mongodb+srv://chelav:chelav123@chelav.y5brogx.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("mongoDB connection is successful")
}).catch((err) =>{
    console.log(err)
})

app.get('/', (req,res)=>{
     res.send("Hello world")
});

app.listen(PORT,()=>{
    console.log("server started")
})