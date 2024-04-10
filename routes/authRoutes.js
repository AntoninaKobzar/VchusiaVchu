const express = require('express');
const router = express.Router();
const multer = require('multer');
const authController = require('../controllers/authController');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
  }
});

const upload = multer({ storage: storage });

// Register route with file upload middleware
router.post('/register', upload.single('photo'), authController.register);
router.post('/login', authController.login);

module.exports = router;