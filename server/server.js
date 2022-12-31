import express from 'express';
import connect from './database/mongodb.js'

import cors from 'cors'
import bodyParser from 'body-parser';
import TransactionsApi from "./routes/TransactionsApi.js"



const PORT = 4000
const app = express();

app.use(cors()) //used because of adding datas in to database from react
app.use(bodyParser.json())

app.get('/', (req,res)=>{
    res.send("Hello world")
});


app.use('/transaction', TransactionsApi);

await connect(); //we make a function for mogodb connection



//listen server orn this port
app.listen(PORT,()=>{
    console.log("server started")
})