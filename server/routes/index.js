import { Router } from "express"
import TransactionsApi from "./TransactionsApi.js"
import AuthApi from "./AuthApi.js"
import UserApi from './UserApi.js'
import passport from "passport"

const router = Router()

router.use('/user',UserApi)
router.use('/transaction', passport.authenticate('jwt', { session: false }),TransactionsApi);
router.use('/auth', AuthApi);

export default router;