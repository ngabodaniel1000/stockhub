import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });

  const [darkmode, setDarkmode] = useState(true);
  const navigate = useNavigate();

  const handleToggleDarkMode = () => {
    setDarkmode(!darkmode);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password || !formData.username) {
      toast.error("Please fill in all fields", {
        theme: darkmode ? 'dark' : 'light',
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8889/api/account/adminregister",
        {
          email: formData.email,
          password: formData.password,
          username: formData.username
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message, {
          theme: darkmode ? 'dark' : 'light',
        });
        setTimeout(() => {
          navigate('/');
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
    <div className={`flex min-h-screen ${darkmode ? 'bg-gray-900' : 'bg-blue-50'} transition-all`}>
      <ToastContainer />

      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <button onClick={handleToggleDarkMode} className="text-xl">
          <FontAwesomeIcon
            icon={darkmode ? faSun : faMoon}
            className={`${darkmode ? 'text-yellow-400' : 'text-gray-800'}`}
          />
        </button>
      </div>

      {/* Image Section */}
      <div className="hidden lg:block w-1/2">
        <img
          src="https://images.unsplash.com/photo-1581091012184-7c7473996d3d?auto=format&fit=crop&w=3000&q=80"
          alt="Register Visual"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Section */}
      <div className={`w-full lg:w-1/2 flex items-center justify-center p-8 ${darkmode ? 'bg-[#0a090e]' : 'bg-white'}`}>
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className={`text-2xl font-bold ${darkmode ? 'text-white' : 'text-blue-900'}`}>
              Register as Admin
            </h1>
            <p className={`mt-2 ${darkmode ? 'text-gray-300' : 'text-gray-600'}`}>
              Create your administrator account
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label htmlFor="username" className={`block text-sm font-medium ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className={`mt-1 block w-full px-4 py-3 rounded-lg ${darkmode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'} border`}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`mt-1 block w-full px-4 py-3 rounded-lg ${darkmode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'} border`}
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
                minLength={8}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`mt-1 block w-full px-4 py-3 rounded-lg ${darkmode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'} border`}
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full text-center py-3 rounded-lg font-semibold text-white ${darkmode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-900 hover:bg-blue-800'}`}
            >
              Register
            </button>

            <div className={`flex justify-between text-sm ${darkmode ? 'text-gray-300' : 'text-blue-900'}`}>
              <a href="/">Already have an account?</a>
              <a href="/managerregister">Register as Manager</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
