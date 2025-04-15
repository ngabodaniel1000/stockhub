import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import bg from "../../../assets/inventory graph.jfif"

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    company: ""
  });

  const [darkmode, setDarkmode] = useState(true); // Default dark mode

  const navigate = useNavigate();

  const handleToggleDarkMode = () => {
    setDarkmode(!darkmode);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password || !formData.username || !formData.company) {
      toast.error("Please fill in all fields", {
        theme: darkmode ? 'dark' : 'light',
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8889/api/account/managerregister",
        {
          email: formData.email,
          password: formData.password,
          username: formData.username,
          company: formData.company
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message, {
          theme: darkmode ? 'dark' : 'light',
        });
        setTimeout(() => {
          navigate('/managerlogin');
        }, 3000);
      } else {
        toast.error(response.data.message, {
          theme: darkmode ? 'dark' : 'light',
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred during registration", {
        theme: darkmode ? 'dark' : 'light',
      });
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8889/api/dashboard", {
          withCredentials: true,
        });
        if (response.data.loggedIn) {
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
    fetchUserProfile();
  }, [navigate]);

  return (
    <div className={`flex min-h-screen ${darkmode ? 'bg-gray-900' : 'bg-blue-50'}`}>
      <ToastContainer />

      {/* Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={handleToggleDarkMode}
          className={`p-2 rounded-full ${darkmode ? 'bg-[#0a090e] text-yellow-400' : 'bg-white text-gray-800'} shadow-md transition-colors duration-300`}
          aria-label="Toggle dark mode"
        >
          <FontAwesomeIcon icon={darkmode ? faSun : faMoon} size="lg" />
        </button>
      </div>

      {/* Image Section */}
      <div className="hidden lg:block w-1/2 h-screen">
        <img
          src={bg}
          alt="Manager Registration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Section */}
      <div className={`w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 ${darkmode ? 'bg-[#0a090e]' : 'bg-white'}`}>
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className={`text-3xl font-bold ${darkmode ? 'text-white' : 'text-blue-900'} mb-2`}>
              Manager Registration
            </h1>
            <p className={`${darkmode ? 'text-gray-300' : 'text-gray-600'}`}>
              Create your manager account
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className={`block text-sm font-medium ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg ${darkmode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'} border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className={`block text-sm font-medium ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg ${darkmode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'} border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder="manager@company.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className={`block text-sm font-medium ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                Company ID
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg ${darkmode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'} border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder="Enter company ID"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className={`block text-sm font-medium ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg ${darkmode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'} border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder="••••••••"
                minLength={8}
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-lg shadow-sm text-sm font-medium text-white ${darkmode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkmode ? 'focus:ring-offset-[#0a090e]' : 'focus:ring-offset-white'} focus:ring-blue-500 transition-colors`}
            >
              Register
            </button>
          </form>

          <div className="text-center">
            <p className={`text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
              Already have an account?{' '}
              <a href="/managerlogin" className={`font-medium ${darkmode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition-colors`}>
                Login here
              </a>
            </p>
            <p className={`mt-2 text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
              Admin user?{' '}
              <a href="/adminregister" className={`font-medium ${darkmode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition-colors`}>
                Register as Admin
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;