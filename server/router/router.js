// importing modules
const express = require('express')
const AdminLogincontroller = require('../controller/Accounts/Admincontroller')
const ManagerLogincontroller = require('../controller/Accounts/Managercontoller')
const router = express.Router()

// make all routes
router.get('/', (req, res) => res.send('Hello World!'))
router.get('/home', (req, res) => res.send('Home page'))
router.post('/account/adminlogin', AdminLogincontroller.validateLogin)
router.post('/account/managerlogin',ManagerLogincontroller.validateLogin)

// exporting routers
module.exports = router

