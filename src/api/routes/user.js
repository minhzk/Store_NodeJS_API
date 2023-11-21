import * as controllers from '../controllers'
import express from 'express'
import verifyToken from '../middlewares/verifyToken'

const router = express.Router()

// Public routes



// Private routes
router.use(verifyToken)
router.get('/', controllers.getCurrentUser)
// router.get('/', [verifyToken, isModeratorOrAdmin], controllers.getCurrentUser)


module.exports = router