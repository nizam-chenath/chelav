import {Router} from 'express'
import User from '../models/User.js'



const router = Router();

router.get('/',  async(req, res) => {
    try{
        const userdata = await User.find()
        res.status(201).json(userdata)
        console.log(userdata)
   }catch(err){
       res.status(422).json(err)
   }
});


export default router;