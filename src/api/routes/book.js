import * as controllers from '../controllers'
import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import { isCreatorOrAdmin } from '../middlewares/verifyRole'
import uploadCloud from '../middlewares/uploader'

const router = express.Router()

// Public routes
router.get('/', controllers.getAllBooks)


// Private routes
router.use(verifyToken)
router.use(isCreatorOrAdmin)
router.post('/', uploadCloud.single('image'), controllers.createBook)
router.put('/', uploadCloud.single('image'), controllers.updateBook)
router.delete('/', controllers.deleteBook)

module.exports = router