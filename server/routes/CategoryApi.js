import {Router} from 'express'
import passport from 'passport'
import * as CategoryController from '../controller/CategoryController.js'

const router = Router();

router.delete('/:id', CategoryController.destroy)

export default router;