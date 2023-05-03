import express from 'express';
import connect from './database/mongodb.js'

import cors from 'cors'
import bodyParser from 'body-parser';

import passport from "passport"
import passportConfig from './config/passport.js'
import * as dotenv from 'dotenv' 
import routes from './routes/index.js'

dotenv.config()

const PORT = process.env.BASE_URL || 5000
const app = express();

app.use(cors()) //used because of adding datas in to database from react
app.use(bodyParser.json())
app.use(passport.initialize())
passportConfig(passport)

app.get('/', (req,res)=>{
    res.send("Hello world")
});

 app.use('/',routes)

await connect(); //we make a function for mogodb connection



//listen server orn this port
app.listen(PORT,()=>{
    console.log(`server started at ${PORT} `)
})