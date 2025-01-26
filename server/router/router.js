// importing modules
const express = require('express')
const AdminLogincontroller = require('../controller/Accounts/Admincontroller')
const ManagerLogincontroller = require('../controller/Accounts/Managercontoller')
const Logoutcontroller = require("../controller/Accounts/logout")
const Authmiddleware = require("../controller/Accounts/authmiddleware")
const Dashboardcontroller = require("../controller/Accounts/Dashboard")
const router = express.Router()

// make all routes
router.get('/', (req, res) => res.send('Hello World!'))
router.get('/home', (req, res) => res.send('Home page'))
router.get("/logout",Authmiddleware.ensureAuthenticated,Logoutcontroller.logout)
// Protected route to handle admin dashboard
router.get("/dashboard",  Dashboardcontroller.dashboard);
router.post('/account/adminlogin', AdminLogincontroller.validateLogin)
router.post('/account/managerlogin',ManagerLogincontroller.validateLogin)

// exporting routers
module.exports = router

