import {Router} from 'express'
import Transaction from '../models/Transaction.js'
import passport from 'passport'

const router = Router()

//this for showing transactions datas in frontend(react)
router.get('/' , passport.authenticate('jwt', { session: false }), async(req,res)=>{
    const transaction = await Transaction.find({}).sort({createdAt: -1}) // sort "created at -1" using for last created show first
    res.json({data : transaction})
})

// this is for adding transaction data to database 
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

// this is for removing data form database with their unique id
router.delete('/:id', async(req,res) =>{
    await Transaction.findOneAndDelete({_id: req.params.id});
    res.json({messsage: "success"})
})

router.patch('/:id', async(req,res) =>{
    await Transaction.updateOne({_id: req.params.id},{$set: req.body})
    res.json({ message: "success"})
})

export default router;