import mongoose from 'mongoose'
const  {Schema} = mongoose;

const userSchema = new Schema({
    firstName : {type:String, required: ["first name is required"]},
    lastName : {type:String, required: ["last name is required"]},
    email : {type:String, required : ["email is required"]},
    password : {type:String, required : ["password is required"]},
    categories:[
        {label: String, icon: String}
    ]
   
},{
    timestamps: true
})

export default new mongoose.model('User', userSchema)