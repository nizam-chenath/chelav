import { Router } from "express"
import TransactionsApi from "./TransactionsApi.js"
import AuthApi from "./AuthApi.js"
import UserApi from './UserApi.js'
import CategoryApi from './CategoryApi.js'
import passport from "passport"

const router = Router()

const auth = passport.authenticate('jwt', { session: false })

router.use('/user',UserApi)
router.use('/transaction', auth,TransactionsApi);
router.use('/auth', AuthApi);
router.use('/category', auth,CategoryApi);

export default router;