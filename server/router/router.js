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
const viewsinglecategorycontroller = require("../controller/category/viewsinglecategory")
const viewcategorycontroller = require("../controller/category/allcategory")
const deleteCategorycontroller = require("../controller/category/removecategory")
const UpdateCategorycontroller = require("../controller/category/updatecategory")

// importing controller used in product operation
const addproductcontroller = require("../controller/products/addproduct")
const deleteproductcontroller = require("../controller/products/deleteproduct")
const viewproductcontroller = require("../controller/products/viewproducts")
const viewsingleproductcontroller = require("../controller/products/viewsingleproduct")
const UpdateProductcontroller = require("../controller/products/updateproduct")

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
router.post("/category/add",addcategorycontoller.addcategory)
router.get("/category/view",viewcategorycontroller.viewcategory)
router.get("/category/viewsingleitem/:categoryId",viewsinglecategorycontroller.viewsinglecategory)
router.delete("/category/delete/:categoryId",deleteCategorycontroller.deleteCategory)
router.put("/category/update/:categoryId",UpdateCategorycontroller.updateCategory)

// all routes required in product operation
router.post("/product/add",addproductcontroller.addproduct)
router.delete("/product/delete/:ProductId",deleteproductcontroller.deleteProduct)
router.put("/product/update/:ProductId",UpdateProductcontroller.updateProduct)
router.get("/product/view",viewproductcontroller.viewProduct)
router.get("/product/viewsingleitem/:ProductId",viewsingleproductcontroller.viewSingleProduct)
// exporting routers
module.exports = router

