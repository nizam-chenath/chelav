import {Router} from 'express'
import Transaction from '../models/Transaction.js'

const router = Router()

//this for showing transactions datas in frontend(react)
router.get('/' , async(req,res)=>{
    const transaction = await Transaction.find({}).sort({createdAt: -1}) // sort "created at -1" using for last created show first
    res.json({data : transaction})
})

router.post('/', async(req,res)=>{
    const {amount, description, date } = req.body;
    const transaction = new Transaction({
        amount,
        description,
        date
    })
    await transaction.save();
    res.json({message: "success"})
});

export default router;