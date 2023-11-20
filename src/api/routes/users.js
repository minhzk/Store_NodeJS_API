const user = require('../controllers/user/getAllUsers.js')
const router = require('express').Router();

router.get('/', user.getAllUsers)

module.exports = router;