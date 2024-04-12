const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/register', authController.register);
router.post('/login', authController.login);


router.get('/', authController.getAll);
router.get('/:id', authController.getById);
router.put('/:id', authController.update);
router.delete('/:id', authController.delete);

module.exports = router;