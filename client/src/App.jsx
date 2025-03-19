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
import Companymanage from './components/Pages/Companymanage.jsx'


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
          <Route path="/notification" element={<Companymanage />} />
          <Route path="/adminregister" element={<AdminRegister />} />
          <Route path="/updateprofile/:userId" element={<Updateprofile />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App