import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkmode, setDarkmode] = useState(true);
  const navigate = useNavigate();

  const handleToggleDarkMode = () => {
    setDarkmode(!darkmode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      toast.error("Please enter your email", {
        theme: darkmode ? 'dark' : 'light',
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8889/api/account/forgot-password', { email });
      toast.success(response.data.message, {
        theme: darkmode ? 'dark' : 'light',
      });
      setTimeout(() => {
        navigate(`/reset-password/${email}`);
      }, 3000);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('OTP (dev only):', response.data.otp);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP', {
        theme: darkmode ? 'dark' : 'light',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkmode ? 'bg-gray-900' : 'bg-blue-50'} transition-all`}>
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

      <div className={`max-w-md w-full space-y-8 p-8 rounded-lg shadow-md ${darkmode ? 'bg-[#0a090e]' : 'bg-white'}`}>
        <div className="text-center">
          <h2 className={`text-3xl font-extrabold ${darkmode ? 'text-white' : 'text-blue-900'}`}>
            Forgot Password
          </h2>
          <p className={`mt-2 text-sm ${darkmode ? 'text-gray-300' : 'text-gray-600'}`}>
            Enter your email to receive a password reset OTP
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email address
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faEnvelope} className={darkmode ? 'text-gray-400' : 'text-gray-500'} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-10 block w-full px-3 py-3 rounded-lg ${darkmode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'} border`}
                  placeholder="Email address"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : 'Send OTP'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className={`text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
            Remember your password?{' '}
            <a href="/login" className={`font-medium ${darkmode ? 'text-blue-400' : 'text-blue-600'}`}>
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;