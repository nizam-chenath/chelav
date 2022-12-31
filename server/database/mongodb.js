import mongoose from 'mongoose'

async function connect () {

    mongoose.set('strictQuery', false)
    
    await mongoose.connect("mongodb+srv://chelav:chelav123@chelav.y5brogx.mongodb.net/?retryWrites=true&w=majority").then(()=>{
        console.log("mongoDB connection is successful")
    }).catch((err) =>{
        console.log(err)
    })
}

export default connect;
