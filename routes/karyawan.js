const express = require('express');
const karayawanController = require('../controllers/karyawan');

const router = express.Router();

// router.get('/', protectRoute, karayawanController.dashboardView);
router.post('/', karayawanController.read);
router.post('/create', karayawanController.create);
router.post('/update', karayawanController.update);
router.post('/delete', karayawanController.delete);

module.exports = router;