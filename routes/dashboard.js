const express = require('express');
const dashboardController = require('../controllers/dashboard');
const { protectRoute } = require('../auth');

const router = express.Router();

router.get('/', protectRoute, dashboardController.dashboardView);
router.get('/dashboard', dashboardController.dashboardView);

module.exports = router;