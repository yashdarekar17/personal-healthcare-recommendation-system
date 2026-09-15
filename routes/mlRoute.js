const express = require('express');
const router = express.Router();
const {mlmodelcontroller , getRecommendations} = require('../controller/mlController');

const mlrouter = () =>{
    router.post('/mlmodel' , mlmodelcontroller);
    router.get('/recommendations/:user_id' , getRecommendations);
}

module.exports = {mlrouter};