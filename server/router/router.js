const express = require('express')
const ManagersLogincontroller = require('../controller/Accounts/Logincontroller')
const router = express.Router()


router.get('/', (req, res) => res.send('Hello World!'))
router.get('/home', (req, res) => res.send('Home page'))
router.post('/account/login', ManagersLogincontroller.validatelogin)
module.exports = router