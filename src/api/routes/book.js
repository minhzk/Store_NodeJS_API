import * as controllers from '../controllers'
import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import { isAdmin } from '../middlewares/verifyRole'
import uploadCloud from '../middlewares/uploader'

const router = express.Router()

// Public routes
router.get('/', controllers.getAllBooks)


// Private routes
router.use(verifyToken)
router.use(isAdmin)
router.post('/', uploadCloud.single('image'), controllers.createBook)

module.exports = router