 const express = require('express')
 const {feedbackcontroller} = require('../controller/feedbackController')
 const router = express.Router();

 
 router.post('/feedback', feedbackcontroller);
 
 
 
 module.exports =router;
