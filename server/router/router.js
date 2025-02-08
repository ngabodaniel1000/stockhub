// importing modules
const express = require('express')
const router = express.Router()

// importing controller used in login system
const AdminLogincontroller = require('../controller/Accounts/Admincontroller')
const ManagerLogincontroller = require('../controller/Accounts/Managercontoller')
const Logoutcontroller = require("../controller/Accounts/logout")
const Authmiddleware = require("../controller/Accounts/authmiddleware")
const Dashboardcontroller = require("../controller/Accounts/Dashboard")
const Updateprofile = require("../controller/Accounts/Updateprofilecontroller")

// importing controller used in category operation
const addcategorycontoller = require("../controller/category/addcategory")


// make all routes
router.get('/', (req, res) => res.send('Hello World!'))
router.get('/home', (req, res) => res.send('Home page'))
router.get("/logout",Authmiddleware.ensureAuthenticated,Logoutcontroller.logout)

// all routes required in login system
router.get("/dashboard",  Dashboardcontroller.dashboard);
router.post('/account/adminlogin', AdminLogincontroller.validateLogin)
router.post('/account/adminregister', AdminLogincontroller.registeradmin)
router.post('/account/managerlogin',ManagerLogincontroller.validateLogin)
router.put("/account/updateprofile/:managerid",Updateprofile.updateprofile)
router.post('/account/managerregister',ManagerLogincontroller.registermanager)

// all routes required in category operation
router.post("/category/add/:managerid",addcategorycontoller.addcategory)

// exporting routers
module.exports = router

