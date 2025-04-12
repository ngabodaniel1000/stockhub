import React from 'react'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'
import Login from './components/Accounts/Admin/Login'
import Dashboard from './components/Pages/Dashboard.jsx'
import ManagerLogin from './components/Accounts/Manager/ManagerLogin'
import { Profiler } from 'react'
import Profile from './components/Pages/Profile.jsx'
import AdminRegister from "./components/Accounts/Admin/Register.jsx"
import ManagerRegister from "./components/Accounts/Manager/Register.jsx"
import Updateprofile from './components/Pages/Updateprofile.jsx'
import Category from './components/Category/Category.jsx'
import AddCategory from './components/Category/AddCategory.jsx'
import DeleteCategory from './components/Category/deleteCategory.jsx'
import UpdateCategory from './components/Category/UpdateCategory.jsx'
import ViewSingleCategory from './components/Category/ViewSingleCategory.jsx'
import AdminNotification from './components/Pages/AdminNotification.jsx'
import Products from './components/Products/Products.jsx'
import AddProduct from './components/Products/AddProduct.jsx'
import UpdateProduct from './components/Products/UpdateProduct.jsx'
import DeleteProduct from './components/Products/DeleteProduct.jsx'
import Suppliers from './components/Suppliers/Suppliers.jsx'
import AddSupplier from './components/Suppliers/AddSupplier.jsx'
import UpdateSupplier from './components/Suppliers/UpdateSupplier.jsx'
import DeleteSupplier from './components/Suppliers/DeleteSupplier.jsx'
import Stock from './components/Stock/Stock.jsx'
import AddStock from './components/Stock/AddStock.jsx'
import ViewProduct from './components/Products/ViewProduct.jsx'
import StockOut from './components/stockout/stockout.jsx'
import AddStockOut from './components/stockout/Addstockout.jsx'
import Customers from './components/Customers/Customers.jsx'
import AddCustomer from './components/Customers/AddCustomer.jsx'
import UpdateCustomer from './components/Customers/UpdateCustomer.jsx'
import DeleteCustomer from './components/Customers/DeleteCustomer.jsx'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/viewcategory/:categoryid" element={<ViewSingleCategory />} />
          <Route path="/category/update/:categoryid" element={<UpdateCategory />} />
          <Route path="/category/delete/:categoryid" element={<DeleteCategory />} />
          <Route path="/category/update/:categoryid" element={<UpdateCategory />} />
          <Route path="/category/add" element={<AddCategory />} />
          <Route path="/managerlogin" element={<ManagerLogin />} />
          <Route path="/managerregister" element={<ManagerRegister />} />
          <Route path="/notification" element={<AdminNotification />} />
          <Route path="/adminregister" element={<AdminRegister />} />
          <Route path="/updateprofile/:userId" element={<Updateprofile />} />
          {/* Product Routes */}
          <Route path="/products" element={<Products />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/product/viewsingleitem/:productId" element={<ViewProduct />} />
          <Route path="/product/update/:productId" element={<UpdateProduct />} />
          <Route path="/product/delete/:productId" element={<DeleteProduct />} />
          {/* Supplier Routes */}
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/supplier/add" element={<AddSupplier />} />
          <Route path="/supplier/update/:supplierId" element={<UpdateSupplier />} />
          <Route path="/supplier/delete/:supplierId" element={<DeleteSupplier />} />
          {/* StockIn Routes */}
          <Route path="/stock" element={<Stock />} />
          <Route path="/stock/add/:productId" element={<AddStock />} />
          {/* StockOUt Routes */}
          <Route path="/stockout" element={<StockOut />} />
          <Route path="/stockout/add/:productId" element={<AddStockOut />} />
          {/* Customer Routes */}
          <Route path="/customers" element={<Customers />} />
          <Route path="/customer/add" element={<AddCustomer />} />
          <Route path="/customer/update/:id" element={<UpdateCustomer />} />
          <Route path="/customer/delete/:id" element={<DeleteCustomer />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App