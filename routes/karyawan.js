const express = require('express');
const karyawanController = require('../controllers/karyawan');

const router = express.Router();

// router.get('/', protectRoute, karyawanController.dashboardView);
router.get('/read', karyawanController.read);
router.post('/create', karyawanController.create);
router.get('/update/:id', karyawanController.update);
router.post('/update/do', karyawanController.updateDo);
router.post('/delete/do', karyawanController.deleteDo);

module.exports = router;