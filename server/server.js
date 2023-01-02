import express from 'express';
import connect from './database/mongodb.js'

import cors from 'cors'
import bodyParser from 'body-parser';
import TransactionsApi from "./routes/TransactionsApi.js"
import AuthApi from "./routes/AuthApi.js"
import passport from "passport"
import passportConfig from './config/passport.js'
import * as dotenv from 'dotenv' 

dotenv.config()

const PORT = 5000
const app = express();

app.use(cors()) //used because of adding datas in to database from react
app.use(bodyParser.json())
app.use(passport.initialize())
passportConfig(passport)

app.get('/', (req,res)=>{
    res.send("Hello world")
});


app.use('/transaction', TransactionsApi);
app.use('/auth', AuthApi);

await connect(); //we make a function for mogodb connection



//listen server orn this port
app.listen(PORT,()=>{
    console.log("server started")
})