import {Router} from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import {register, login}  from '../controller/AuthController.js'

const router = Router()

// for register/signup
router.post('/register', register);


//for login/signin
router.post('/login',login)

export default router;