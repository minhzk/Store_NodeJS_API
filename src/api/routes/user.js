import * as controllers from '../controllers'
import express from 'express'
import verifyToken from '../middlewares/verifyToken'

const router = express.Router()

// Public routes



// Private routes
router.use(verifyToken)
router.get('/', controllers.getCurrentUser)

module.exports = router