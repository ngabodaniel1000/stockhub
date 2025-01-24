import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  // State to store form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role:"Manager"
  });

  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = async (event) => {
    event.preventDefault();

    // Basic form validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8889/api/account/managerlogin",
        {
          email: formData.email,
          password: formData.password,
          role:formData.role
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during login",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer />
      <form
        className="w-fit lg:w-[400px] rounded-sm flex flex-col gap-5 border-2 border-yellow h-fit p-5 text-md lg:text-lg"
        onSubmit={handleLogin}
      >
        <div>
          <h1 className="text-center font-bold text-xl">Login as Manager</h1>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="mt-4 w-full h-[32px] lg:h-[40px] bg-gray-100"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="mt-4 w-full h-[32px] lg:h-[40px] bg-gray-100"
            // minLength={8}
            required
          />
        </div>
        <div className="flex flex-col">
          <button
            type="submit"
            className="mt-5 bg-blue-900 hover:bg-blue-700 h-[40px] lg:h-[50px] rounded-xl text-white"
          >
            Login
          </button>
        </div>
        <div className="flex flex-row gap-10 text-blue-900">
          <a href="#" className="ml-5">
            Forgot password
          </a>
          <a href="/">Login as Admin</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
