const express = require('express');
const router = express.Router();
const { createHealthprofile, getHealthprofile, gethealthdashboard } = require('../controller/heathcareController');


router.post('/healthreport', createHealthprofile);
router.get('/healthreport/:id', getHealthprofile);
router.get('/dashboard/:user_id', gethealthdashboard);


module.exports = router;




