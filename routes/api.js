const express = require('express');
var cors = require('cors');
const karyawanController = require('../controllers/karyawan');
const karyawanLog = require("../models/log");

const router = express.Router();

var corsOptions = {
    origin: '*',
    // method: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.get('/list', karyawanController.apiTest);
router.get('/image/new', karyawanController.apiGetNewImage);
router.get('/image/:folder/:sequence' , karyawanController.apiImage);
router.post('/absen' , karyawanController.apiAbsentLog);

module.exports = router;