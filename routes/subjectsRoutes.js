const express = require('express');
const router = express.Router();
const subjectsController=require('../controllers/subjects');

router.get('/subjects', subjectsController.get);
router.post('/subjects',subjectsController.add);
router.get('./subjects', subjectsController.getAll);

module.exports=router;