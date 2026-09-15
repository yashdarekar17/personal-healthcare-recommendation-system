const express = require('express');
const route = express.Router();
const {createHealthprofile , getHealthprofile , gethealthdashboard} = require('../controller/heathcareController');

const healthrouter = () =>{
    route.post('/heathreport' , createHealthprofile);
    route.get('/heathreport/:id' , getHealthprofile)
    route.get('/dashboard' , gethealthdashboard)
}

module.exports = {healthrouter};




