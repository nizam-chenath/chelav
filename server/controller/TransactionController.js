import Transaction from '../models/Transaction.js'


export const index = async(req,res)=>{
    const transaction = await Transaction.find({user_id: req.user._id}).sort({createdAt: -1}) // sort "created at -1" using for last created show first
    const demo = await Transaction.aggregate([
        {
            $match:{user_id:req.user._id},
        },
        {
            $group:{
                _id:{$month: "$date"},
                transactions: {$push: {amount: "$amount", description: "$description",category_id: "$category_id",date:"$date",_id:"$_id"}},
                totalExpenses: {$sum: "$amount"}
            }

        }
    ])
    res.json({data : demo})
}

export const create = async(req,res)=>{
    const {amount, description, date,category_id } = req.body;
    const transaction = new Transaction({
        amount,
        description,
        date,
        user_id : req.user._id,
        category_id,
    })
    await transaction.save();
    res.json({message: "success"})
}

export const destroy = async(req,res) =>{
    await Transaction.findOneAndDelete({_id: req.params.id});
    res.json({messsage: "success"})
}

export const update = async(req,res) =>{
    await Transaction.updateOne({_id: req.params.id},{$set: req.body})
    res.json({ message: "success"})
}