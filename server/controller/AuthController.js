import {Router} from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const categories = [
    {label:'Travel', icon: 'user'},
    {label:'Shopping', icon: 'user'},
    {label:'Investment', icon: 'user'},
    {label:'Bills', icon: 'user'},
]

export const register = async (req,res)=>{
    //get all formdata of registering
    const {email, password, firstName, lastName} = req.body
    //check user exists with same email
    const checkUser = await User.findOne({email})
    if(checkUser){
        res.status(406).json({message: "user already exists"})
        return;
    }

    //hash the password
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
const hashedPassword = await bcrypt.hashSync(password, salt);


    const user = await User( {
        email,
         password:hashedPassword,
          firstName,
           lastName,
          categories,
        })
    //store user
     await user.save();
 
    res.status(201).json({message: "user is created"})
}


export const login = async(req,res) =>{
    const {email,password} = req.body;
   
    const user = await User.findOne({email})
    if(!user){
        res.status(406).json({message: "credentials not found"})
        return;
    }
   
    const matched = await bcrypt.compare(password,user.password)
    if(!matched){
       res.status(406).json({message: "credentials not found"})
       return;
    }
    //create JWT token
    const payload = {
       username: email,
        _id: user._id,
    }
    const token = jwt.sign(payload, "some secret");
    res.json({message: "successfully logged in",token , user})
   }