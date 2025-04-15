import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import bg from "../../../assets/inventory graph.jfif"
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Manager"
  });

  const [darkmode, setDarkmode] = useState(true); // Default dark mode

  const navigate = useNavigate();

  const handleToggleDarkMode = () => {
    setDarkmode(!darkmode);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields", {
        theme: darkmode ? 'dark' : 'light',
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8889/api/account/managerlogin",
        {
          email: formData.email,
          password: formData.password,
          role: formData.role
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message, {
          theme: darkmode ? 'dark' : 'light',
        });
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        toast.error(response.data.message, {
          theme: darkmode ? 'dark' : 'light',
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred during login", {
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
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={handleToggleDarkMode}
          className={`p-2 rounded-full ${darkmode ? 'bg-[#0a090e] text-yellow-400' : 'bg-white text-gray-800'}`}
          aria-label="Toggle dark mode"
        >
          <FontAwesomeIcon icon={darkmode ? faSun : faMoon} size="lg" />
        </button>
      </div>

      {/* Image Section */}
      <div className="hidden lg:block w-1/2">
        <img
        src={bg}
          alt="Login Visual"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Section */}
      <div className={`w-full lg:w-1/2 flex items-center justify-center p-8 ${darkmode ? 'bg-[#0a090e]' : 'bg-white'}`}>
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className={`text-2xl font-bold ${darkmode ? 'text-white' : 'text-blue-900'}`}>
              Login as Manager
            </h1>
            <p className={`mt-2 ${darkmode ? 'text-gray-300' : 'text-gray-600'}`}>
              Welcome back! Please enter your credentials
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`mt-1 block w-full px-4 py-3 rounded-lg ${darkmode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'} border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`mt-1 block w-full px-4 py-3 rounded-lg ${darkmode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'} border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className={`h-4 w-4 rounded ${darkmode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'} focus:ring-blue-500`}
                />
                <label htmlFor="remember-me" className={`ml-2 text-sm ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className={`font-medium ${darkmode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${darkmode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkmode ? 'focus:ring-offset-[#0a090e]' : 'focus:ring-offset-white'} focus:ring-blue-500`}
              >
                Login
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className={`text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
              Don't have an account?{' '}
              <a href="/managerregister" className={`font-medium ${darkmode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>
                Register
              </a>
            </p>
            <p className={`mt-1 text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
              Admin?{' '}
              <a href="/" className={`font-medium ${darkmode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>
                Login as Admin
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;