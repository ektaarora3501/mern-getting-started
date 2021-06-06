// Routes for authentication 
const { Router } = require('express');
const authController = require('../controllers/authController');
const router = Router();
// To add middleware
const auth = require('../middleware/auth');
const { route } = require('./item');

router.post('/register',authController.signup);
router.post('login',authController.login);
router.get('/user',auth,authController.get_user);

module.exports = router;