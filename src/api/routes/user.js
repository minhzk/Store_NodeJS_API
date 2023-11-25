import * as controllers from '../controllers';
import express from 'express';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

// Public routes

// Private routes
router.use(verifyToken);
router.get('/', controllers.getUserById);
// router.get('/', [verifyToken, isModeratorOrAdmin], controllers.getUserById)

module.exports = router;
