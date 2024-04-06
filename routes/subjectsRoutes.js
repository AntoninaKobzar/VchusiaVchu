const express = require('express');
const router = express.Router();
const subjectsController=require('../controllers/subjects');

router.get('/subjects', subjectsController.get);

module.exports=router;