import * as controllers from '../controllers'
import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import { isAdmin } from '../middlewares/verifyRole'

const router = express.Router()

// Public routes
router.get('/', controllers.getAllBooks)


// Private routes
router.use(verifyToken)
router.use(isAdmin)
router.post('/', controllers.createBook)

module.exports = router