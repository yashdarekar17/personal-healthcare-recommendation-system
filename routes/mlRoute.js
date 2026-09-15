const express = require('express');
const router = express.Router();
const {mlmodelcontroller , getRecommendations} = require('../controller/mlController');


    router.post('/mlmodel' , mlmodelcontroller);
    router.get('/recommendations/:user_id' , getRecommendations);


module.exports = router;