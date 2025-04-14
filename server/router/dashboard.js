const express = require('express');
const router = express.Router();
const dashboardController = require('../controller/dashboard/dashboard');

// Get dashboard overview
router.get('/overview', dashboardController.getDashboardOverview);

// Get sales data for charts
router.get('/sales', dashboardController.getSalesData);

// Get inventory status
router.get('/inventory', dashboardController.getInventoryStatus);

module.exports = router; 