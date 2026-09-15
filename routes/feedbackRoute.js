 const express = require('express')
 const {feedbackcontroller} = require('../controller/feedbackController')
 const router = express.Router();

 const feedbackrouter = () =>{
    router.post('/feedback', feedbackcontroller);
 }
 
 
 module.exports = {feedbackrouter};
