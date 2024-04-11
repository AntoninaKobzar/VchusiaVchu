const express = require('express');
const router = express.Router();
const subjectsController=require('../controllers/subjects');

router.post('/',subjectsController.add);
router.get('/', subjectsController.getAll);

module.exports=router;