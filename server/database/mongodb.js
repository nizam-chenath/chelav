import mongoose from 'mongoose'

async function connect () {

    // const username = process.env.MONGO_DB_USERNAME
    // const password = process.env.MONGO_DB_PASSWORD
    // const url = process.env.MONGO_DB_URL

    mongoose.set('strictQuery', true)
    
    await mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
        console.log("mongoDB connection is successful")
    }).catch((err) =>{
        console.log(err)
    })
}

export default connect;
