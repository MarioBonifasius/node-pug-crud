const express = require('express');
var cors = require('cors');
const karyawanController = require('../controllers/karyawan');

const router = express.Router();

var corsOptions = {
    origin: '*',
    // method: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.get('/list', karyawanController.apiTest);
router.get('/image/:folder/:sequence' , karyawanController.apiImage);
// router.get('public /image' , karyawanController.apiImage);

module.exports = router;