const express = require('express');
var cors = require('cors');
const karyawanController = require('../controllers/karyawan');

const router = express.Router();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.get('/list', cors(corsOptions) , karyawanController.apiTest);
router.get('/image' , karyawanController.apiImage);

module.exports = router;