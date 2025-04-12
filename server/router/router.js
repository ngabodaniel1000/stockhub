// importing modules
const express = require('express')
const router = express.Router()
// importing middleware
const Middleware = require("../middleware/AuthMiddleware")
const CustomerModel = require('../model/customer/customer');

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

// importing controller used in supplier operation
const addSupplierController = require("../controller/suppliers/addsupplier")
const viewSuppliersController = require("../controller/suppliers/viewsuppliers")
const viewSingleSupplierController = require("../controller/suppliers/viewsinglesupplier")
const updateSupplierController = require("../controller/suppliers/updatesupplier")
const deleteSupplierController = require("../controller/suppliers/deletesupplier")

// importing controller used in stock operation
const addstockcontroller = require("../controller/Stockin/addstockin")
const viewstockcontroller = require("../controller/Stockin/viewstockin")
const updatestockcontroller = require("../controller/Stockin/updatestockin")
const deletestockcontroller = require("../controller/Stockin/deletestockin")

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
router.post("/category/add/",Middleware.ensureAuthenticated,addcategorycontoller.addcategory)
router.get("/category/view",Middleware.ensureAuthenticated,viewcategorycontroller.viewcategory)
router.get("/category/viewsingleitem/:categoryId",Middleware.ensureAuthenticated,viewsinglecategorycontroller.viewsinglecategory)
router.delete("/category/delete/:categoryId",Middleware.ensureAuthenticated,deleteCategorycontroller.deleteCategory)
router.put("/category/update/:categoryId",Middleware.ensureAuthenticated,UpdateCategorycontroller.updateCategory)

// all routes required in product operation
router.post("/product/add",Middleware.ensureAuthenticated,addproductcontroller.addProduct)
router.delete("/product/delete/:productId",Middleware.ensureAuthenticated,deleteproductcontroller.deleteProduct)
router.put("/product/update/:productId",Middleware.ensureAuthenticated,UpdateProductcontroller.updateProduct)
router.get("/product/view",Middleware.ensureAuthenticated,viewproductcontroller.viewProduct)
router.get("/product/viewsingleitem/:ProductId",Middleware.ensureAuthenticated,viewsingleproductcontroller.viewSingleProduct)

// all routes required in supplier operation
router.post("/supplier/add", Middleware.ensureAuthenticated, addSupplierController.addSupplier)
router.get("/supplier/view", Middleware.ensureAuthenticated, viewSuppliersController.viewSuppliers)
router.get("/supplier/view/:supplierId", Middleware.ensureAuthenticated, viewSingleSupplierController.viewSingleSupplier)
router.put("/supplier/update/:supplierId", Middleware.ensureAuthenticated, updateSupplierController.updateSupplier)
router.delete("/supplier/delete/:supplierId", Middleware.ensureAuthenticated, deleteSupplierController.deleteSupplier)

// all routes required in stock operation
router.post("/stock/add/:productId", Middleware.ensureAuthenticated, addstockcontroller.addStock)
router.get("/stock/view", Middleware.ensureAuthenticated, viewstockcontroller.viewStock)
router.delete("/stock/delete/:stockInId", Middleware.ensureAuthenticated, deletestockcontroller.delete)
router.put("/stock/update/:stockId", Middleware.ensureAuthenticated, updatestockcontroller.updateStockStatus)


// Create a new customer
router.post('/customer/add', async (req, res) => {
    const { name, contactEmail, phone, address } = req.body;
    const companyId = req.session.company;

    try {
        if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "Company ID is required"
            });
        }
        if(!name || !contactEmail || !phone || !address){
            return res.status(400).json({
                success: false,
                message: "Fill all required fields"
            });
        }

   // Check if supplier with same name already exists for this company
          const existingCustomer = await CustomerModel.findOne({ 
              company: companyId,
              name: { $regex: new RegExp(name, 'i') }
          });
  
          if (existingCustomer) {
              return res.status(400).json({
                  success: false,
                  message: "Customer with this name already exists for your company"
              });
          }
  
          // Create new supplier
          const newCustomer = new CustomerModel({
              name,
              contactEmail,
              phone,
              address,
              company: companyId
          });
  
          await newCustomer.save();
  
          return res.status(201).json({
              success: true,
              message: "Customer added successfully",
              customer: newCustomer
          });
  
      } catch (error) {
          console.error("Error adding customer:", error);
          return res.status(500).json({
              success: false,
              message: "An error occurred while adding the customer"
          });
      }
  })

// Get all customers
router.get('/customer/view', async (req, res) => {
    try {
        const customers = await CustomerModel.find().populate('company');
        res.status(200).json({ success: true, customers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get a single customer
router.get('/customer/view/:id', async (req, res) => {
    try {
        const customer = await CustomerModel.findById(req.params.id).populate('company');
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }
        res.status(200).json({ success: true, customer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update a customer
router.put('/customer/update/:customerId', async (req, res) => {
     const { customerId } = req.params;
        const { name, contactEmail, phone, address } = req.body;
        const companyId = req.session.company;
    
        try {
            if (!companyId) {
                return res.status(400).json({
                    success: false,
                    message: "Company ID is required"
                });
            }
    
            // Check if supplier exists and belongs to the company
            const existingcustomer = await CustomerModel.findOne({ 
                _id:customerId,
                company: companyId 
            });
    
            if (!existingcustomer) {
                return res.status(404).json({
                    success: false,
                    message: "Customer not found"
                });
            }
    
            // Check if new name conflicts with existing suppliers
            if (name && name.toLowerCase() !== existingcustomer.name.toLowerCase()) {
                const nameConflict = await CustomerModel.findOne({
                    company: companyId,
                    name: { $regex: new RegExp(name, 'i') },
                    _id: { $ne: customerId }
                });
    
                if (nameConflict) {
                    return res.status(400).json({
                        success: false,
                        message: "  Customer with this name already exists for your company"
                    });
                }
            }
    
            // Update supplier
            const updatedcustomer = await CustomerModel.findByIdAndUpdate(
                customerId,
                {
                    name: name || existingcustomer.name,
                    contactEmail: contactEmail || existingcustomer.contactEmail,
                    phone: phone || existingcustomer.phone,
                    address: address || existingcustomer.address
                },
                { new: true }
            );
    
            return res.status(200).json({
                success: true,
                message: "Customer updated successfully",
                supplier: updatedcustomer
            });
    
        } catch (error) {
            console.error("Error updating customer:", error);
            return res.status(500).json({
                success: false,
                message: "An error occurred while updating the customer"
            });
        }
});

// Delete a customer
router.delete('/customer/delete/:id', async (req, res) => {
    try {
        const customer = await CustomerModel.findByIdAndDelete(req.params.id);
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }
        res.status(200).json({ success: true, message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// exporting routers
module.exports = router

