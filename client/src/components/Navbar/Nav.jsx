import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import "../../index.css";
import Login from '../Accounts/Admin/Login.jsx';
import Dashboard from '../Pages/Dashboard.jsx';
import ManagerLogin from '../Accounts/Manager/ManagerLogin';
import Profile from '../Pages/Profile.jsx';
import AdminRegister from "../Accounts/Admin/Register.jsx";
import ManagerRegister from "../Accounts/Manager/Register.jsx";
import Updateprofile from '../Pages/Updateprofile.jsx';
import Category from '../Category/Category.jsx';
import AddCategory from '../Category/AddCategory.jsx';
import DeleteCategory from '../Category/deleteCategory.jsx';
import UpdateCategory from '../Category/UpdateCategory.jsx';
import ViewSingleCategory from '../Category/ViewSingleCategory.jsx';
import AdminNotification from '../Pages/AdminNotification.jsx';
import Products from '../Products/Products.jsx';
import AddProduct from '../Products/AddProduct.jsx';
import UpdateProduct from '../Products/UpdateProduct.jsx';
import DeleteProduct from '../Products/DeleteProduct.jsx';
import Suppliers from '../Suppliers/Suppliers.jsx';
import AddSupplier from '../Suppliers/AddSupplier.jsx';
import UpdateSupplier from '../Suppliers/UpdateSupplier.jsx';
import DeleteSupplier from '../Suppliers/DeleteSupplier.jsx';
import Stock from '../Stock/Stock.jsx';
import AddStock from '../Stock/AddStock.jsx';
import ViewProduct from '../Products/ViewProduct.jsx';
import StockOut from '../stockout/stockout.jsx';
import AddStockOut from '../stockout/Addstockout.jsx';
import Customers from '../Customers/Customers.jsx';
import AddCustomer from '../Customers/AddCustomer.jsx';
import UpdateCustomer from '../Customers/UpdateCustomer.jsx';
import DeleteCustomer from '../Customers/DeleteCustomer.jsx';
import Setting from '../Pages/Setting.jsx';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { faBell, faChartDiagram, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Guide from '../Pages/Guides.jsx';
import Privacypolicy from '../Pages/Privacyplicy.jsx';
import ChatBot from '../Pages/Chatbot.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBox,
  faLayerGroup,
  faBoxes,
  faBoxOpen,
  faUsers,
  faTruck,
  faCog,
  faRobot
} from '@fortawesome/free-solid-svg-icons';
import ForgotPassword from '../Accounts/Password/Forgetpassword.jsx';
import ResetPassword from '../Accounts/Password/Resetpassword.jsx';

// Protected Route Component
const ProtectedRoute = ({ element, allowedRoles = [], ...props }) => {
  const [authStatus, setAuthStatus] = useState({ loading: true, loggedIn: false, role: null });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:8889/api/dashboard", {
          withCredentials: true,
        });
        
        if (!response.data.loggedIn) {
          navigate("/");
        } else if (allowedRoles.length > 0 && !allowedRoles.includes(response.data.role)) {
          navigate("/dashboard"); // Redirect to dashboard if role not allowed
        } else {
          setAuthStatus({ loading: false, loggedIn: true, role: response.data.role });
        }
      } catch (err) {
        console.error("Error checking auth:", err);
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate, allowedRoles]);

  if (authStatus.loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return React.cloneElement(element, { ...props, role: authStatus.role });
};

function Nav() {
  const [userProfile, setUserProfile] = useState({});
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const [darkmode, setDarkmode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const profileResponse = await axios.get("http://localhost:8889/api/dashboard", {
          withCredentials: true,
        });

        if (profileResponse.data.loggedIn) {
          setUserProfile(profileResponse.data);

          const settingsResponse = await axios.get('http://localhost:8889/api/settings', {
            withCredentials: true
          });

          if (settingsResponse.data.success) {
            setDarkmode(settingsResponse.data.settings.darkmode);
            document.body.className = settingsResponse.data.settings.darkmode ? 'dark' : '';
          }
        }
      } catch (err) {
        setError("Failed to fetch initial data.");
        console.error("Error:", err);
      }
    };

    fetchInitialData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8889/api/logout', { withCredentials: true });
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleDarkMode = async (newMode) => {
    try {
      const response = await axios.put(
        'http://localhost:8889/api/settings/update',
        { darkmode: newMode },
        { withCredentials: true }
      );

      if (response.data.success) {
        setDarkmode(newMode);
        document.body.className = newMode ? 'dark' : '';
      }
    } catch (error) {
      console.error('Failed to update dark mode', error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const showNav = location.pathname !== '/' && 
                  location.pathname !== '/adminregister' && 
                  location.pathname !== '/managerlogin' && 
                  location.pathname !== '/forgetpassword' && 
                  !location.pathname.startsWith('/reset-password/')&& 
                  location.pathname !== '/managerregister';

  return (
    <div className={`${darkmode ? 'bg-[#0a090e]' : 'bg-white'} flex flex-cols h-[100%] overflow-auto relative`}>
      {showNav && (
        <nav className={`${darkmode ? 'bg-[#0a090e]' : 'bg-white'} fixed min-h-screen p-10 
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 transition-transform duration-300 ease-in-out z-[50]
          border-r border-gray-400 shadow-lg`}>
          <h2 className={`${darkmode ? 'text-white' : 'text-black'} text-3xl`}>Stockhub</h2>
          <ul className={`${darkmode ? 'text-white' : 'text-black'} mt-10`}>
            <li className='mt-5'><a href='/dashboard' className="flex items-center gap-2"><FontAwesomeIcon icon={faChartDiagram}/>Dashboard</a></li>
            {userProfile.role === "Admin" && <li className='mt-7'><a href="/notification" className="flex items-center gap-2"><FontAwesomeIcon icon={faBell} />Announcement</a></li>}
            <li className='mt-5'>
  <a href='/products' className="flex items-center gap-2">
    <FontAwesomeIcon icon={faBox} />
    Products
  </a>
</li>
<li className='mt-5'>
  <a href="/category" className="flex items-center gap-2">
    <FontAwesomeIcon icon={faLayerGroup} />
   Category
  </a>
</li>
<li className='mt-5'>
  <a href="/stock" className="flex items-center gap-2">
    <FontAwesomeIcon icon={faBoxes} />
   Stockin
  </a>
</li>
<li className='mt-5'>
  <a href="/stockout" className="flex items-center gap-2">
    <FontAwesomeIcon icon={faBoxOpen} />
    Stockout
  </a>
</li>
<li className='mt-5'>
  <a href="/customers" className="flex items-center gap-2">
    <FontAwesomeIcon icon={faUsers} />
    Customers
  </a>
</li>
<li className='mt-5'>
  <a href="/suppliers" className="flex items-center gap-2">
    <FontAwesomeIcon icon={faTruck} />
    Suppliers
  </a>
</li>
<li className='mt-5'>
  <a href="/settings" className="flex items-center gap-2">
    <FontAwesomeIcon icon={faCog} />
   Settings
  </a>
</li>
<li className='mt-5'>
  <a href="/ask-ai" className="flex items-center gap-2">
    <FontAwesomeIcon icon={faRobot} />
    Ask AI
  </a>
</li>
          </ul>
        </nav>
      )}

      <div className={`${darkmode ? 'bg-[#0a090e]' : 'bg-white'} w-full md:ml-[240px] pb-10 ${mobileMenuOpen && showNav ? 'ml-[240px]' : 'ml-0'} transition-margin duration-300 ease-in-out`}>
        {showNav && (
          <div className={`${darkmode ? 'bg-gray-800' : 'bg-gray-200'} w-full h-20 mt-2 flex justify-end items-center pr-4`}>
            <button
              onClick={() => toggleDarkMode(!darkmode)}
              className={`p-2 rounded-full ${darkmode ? 'bg-gray-700 text-white' : 'bg-gray- text-black'}`}
            >
              {darkmode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors ml-4"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </button>
          </div>
        )}

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="//profile" element={<Profile darkmode={darkmode}/>} />
          <Route path="/managerlogin" element={<ManagerLogin />} />
          <Route path="/managerregister" element={<ManagerRegister />} />
          <Route path="/adminregister" element={<AdminRegister />} />
          <Route path="/forgetpassword" element={<ForgotPassword />} />
          <Route path="/reset-password/:email" element={<ResetPassword/>} />

          {/* Protected routes */}
          <Route path="/profile" element={<ProtectedRoute element={<Profile darkmode={darkmode} />} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard darkmode={darkmode} />} />} />
          <Route path="/category" element={<ProtectedRoute element={<Category darkmode={darkmode} />} />} />
          <Route path="/category/viewcategory/:categoryid" element={<ProtectedRoute element={<ViewSingleCategory darkmode={darkmode} />} />} />
          <Route path="/category/update/:categoryid" element={<ProtectedRoute element={<UpdateCategory darkmode={darkmode} />} />} />
          <Route path="/category/delete/:categoryid" element={<ProtectedRoute element={<DeleteCategory darkmode={darkmode} />} />} />
          <Route path="/category/add" element={<ProtectedRoute element={<AddCategory darkmode={darkmode} />} />} />
          
          <Route path="/notification" element={<ProtectedRoute element={<AdminNotification darkmode={darkmode} />} allowedRoles={["Admin"]} />} />
          
          <Route path="/updateprofile/:userId" element={<ProtectedRoute element={<Updateprofile darkmode={darkmode} />} />} />

          <Route path="/products" element={<ProtectedRoute element={<Products t={t} darkmode={darkmode} />} />} />
          <Route path="/product/add" element={<ProtectedRoute element={<AddProduct darkmode={darkmode} />} />} />
          <Route path="/product/viewsingleitem/:productId" element={<ProtectedRoute element={<ViewProduct darkmode={darkmode} />} />} />
          <Route path="/product/update/:productId" element={<ProtectedRoute element={<UpdateProduct darkmode={darkmode} />} />} />
          <Route path="/product/delete/:productId" element={<ProtectedRoute element={<DeleteProduct darkmode={darkmode} />} />} />

          <Route path="/suppliers" element={<ProtectedRoute element={<Suppliers darkmode={darkmode} />} />} />
          <Route path="/supplier/add" element={<ProtectedRoute element={<AddSupplier darkmode={darkmode} />} />} />
          <Route path="/supplier/update/:supplierId" element={<ProtectedRoute element={<UpdateSupplier darkmode={darkmode} />} />} />
          <Route path="/supplier/delete/:supplierId" element={<ProtectedRoute element={<DeleteSupplier darkmode={darkmode} />} />} />

          <Route path="/stock" element={<ProtectedRoute element={<Stock darkmode={darkmode}/>} />} />
          <Route path="/stock/add/:productId" element={<ProtectedRoute element={<AddStock darkmode={darkmode}/>} />} />

          <Route path="/stockout" element={<ProtectedRoute element={<StockOut darkmode={darkmode}/>} />} />
          <Route path="/stockout/add/:productId" element={<ProtectedRoute element={<AddStockOut darkmode={darkmode} />} />} />

          <Route path="/customers" element={<ProtectedRoute element={<Customers darkmode={darkmode} />} />} />
          <Route path="/customer/add" element={<ProtectedRoute element={<AddCustomer darkmode={darkmode} />} />} />
          <Route path="/customer/update/:id" element={<ProtectedRoute element={<UpdateCustomer darkmode={darkmode} />} />} />
          <Route path="/customer/delete/:id" element={<ProtectedRoute element={<DeleteCustomer darkmode={darkmode} />} />} />

          <Route path='/settings' element={<ProtectedRoute element={<Setting darkmode={darkmode} toggleDarkMode={toggleDarkMode} />} />} />
          <Route path='/guides' element={<ProtectedRoute element={<Guide darkmode={darkmode} toggleDarkMode={toggleDarkMode} />} />} />
          <Route path='/privacy' element={<ProtectedRoute element={<Privacypolicy darkmode={darkmode} toggleDarkMode={toggleDarkMode} />} />} />
          <Route path='/ask-ai' element={<ProtectedRoute element={<ChatBot darkmode={darkmode} toggleDarkMode={toggleDarkMode} />} />} />
        </Routes>
      </div>
    </div>
  );
}

export default Nav;