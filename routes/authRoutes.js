 const express = require('express')
 const {login , register} = require('../controller/authController')
 const router = express.Router();
 
 const authrouter = () =>{
   router.post('/register' , register);
   router.post('/login' , login);
 }
 

 module.exports = authrouter;
 