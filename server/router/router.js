// importing modules
const express = require('express')
const ManagersLogincontroller = require('../controller/Accounts/Logincontroller')
const router = express.Router()

// make all routes
router.get('/', (req, res) => res.send('Hello World!'))
router.get('/home', (req, res) => res.send('Home page'))
router.post('/account/login', ManagersLogincontroller.validatelogin)

// exporting routers
module.exports = router