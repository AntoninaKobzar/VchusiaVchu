const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/register', upload.single('photo'), authController.registerUserWithPhoto);

module.exports = router;