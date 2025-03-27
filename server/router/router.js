// importing modules
const express = require('express')
const router = express.Router()
// importing middleware
const Middleware = require("../middleware/AuthMiddleware")

// importing controller used in login system
const AdminLogincontroller = require('../controller/Accounts/Admincontroller')
const ManagerLogincontroller = require('../controller/Accounts/Managercontoller')
const Logoutcontroller = require("../controller/Accounts/logout")
const Dashboardcontroller = require("../controller/Accounts/Dashboard")
const Updateprofile = require("../controller/Accounts/Updateprofilecontroller")
const Acceptmanager = require("../controller/Accounts/Acceptmanager")

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

// make basic routes
router.get('/', (req, res) => res.send('Hello World!'))
router.get('/home', (req, res) => res.send('Home page'))
router.get("/logout",Middleware.ensureAuthenticated,Logoutcontroller.logout)

// all routes required for company
// router.post('/company/add',ensureAuthenticatedAdmin.ensureAuthenticated,ensureAuthenticatedAdmin.isAdmin,Companyaddcontroller.addCompany)

// all routes required in login system
router.get("/dashboard",Dashboardcontroller.dashboard);
router.post('/account/adminlogin', AdminLogincontroller.validateLogin)
router.post('/account/adminregister', AdminLogincontroller.registeradmin)
router.post('/account/managerlogin',ManagerLogincontroller.validateLogin)
router.put("/account/updateprofile/:managerid",Middleware.ensureAuthenticated,Updateprofile.updateprofile)
router.post('/account/managerregister',ManagerLogincontroller.registermanager)
router.post('/account/acceptmanager/:managerId',Middleware.isAdmin,Acceptmanager.acceptManager)
router.get('/account/viewpendingmanager',Middleware.isAdmin,Acceptmanager.getPendingManagers)

// all routes required in category operation
router.post("/category/add/:companyId",Middleware.ensureAuthenticated,addcategorycontoller.addcategory)
router.get("/category/view/:companyId",Middleware.ensureAuthenticated,viewcategorycontroller.viewcategory)
router.get("/category/viewsingleitem/:categoryId",Middleware.ensureAuthenticated,viewsinglecategorycontroller.viewsinglecategory)
router.delete("/category/delete/:companyId",Middleware.ensureAuthenticated,deleteCategorycontroller.deleteCategory)
router.put("/category/update/:CompanyId/:categoryId",Middleware.ensureAuthenticated,UpdateCategorycontroller.updateCategory)

// all routes required in product operation
router.post("/product/add",Middleware.ensureAuthenticated,addproductcontroller.addproduct)
router.delete("/product/delete/:ProductId",Middleware.ensureAuthenticated,deleteproductcontroller.deleteProduct)
router.put("/product/update/:ProductId",Middleware.ensureAuthenticated,UpdateProductcontroller.updateProduct)
router.get("/product/view",Middleware.ensureAuthenticated,viewproductcontroller.viewProduct)
router.get("/product/viewsingleitem/:ProductId",Middleware.ensureAuthenticated,viewsingleproductcontroller.viewSingleProduct)
// exporting routers
module.exports = router

