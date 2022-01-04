const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const auth = require('../middleware/auth');


router.get('/profile', auth, UserController.profile);


module.exports = router;
