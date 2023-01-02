import {Router} from 'express'
import Transaction from '../models/Transaction.js'
import passport from 'passport'
import * as TransactionController from '../controller/TransactionController.js'

const router = Router()

//this for showing transactions datas in frontend(react)
router.get('/' ,  TransactionController.index)

// this is for adding transaction data to database 
router.post('/', TransactionController.create);

// this is for removing data form database with their unique id
router.delete('/:id', TransactionController.destroy)

//for updating

router.patch('/:id', TransactionController.update)

export default router;