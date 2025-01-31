import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  // State to store form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role:"Admin",
    companyname:"",
    username:""
  });

  const navigate = useNavigate();

  // Function to handle Register
  const handleRegister = async (event) => {
    event.preventDefault();

    // Basic form validation
    if (!formData.email || !formData.password || !formData.companyname || !formData.username || !formData.role) {
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
        "http://localhost:8889/api/account/adminregister",
        {
          email: formData.email,
          password: formData.password,
          role:formData.role,
          companyname:formData.companyname,
          username:formData.username
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
          navigate('/');
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
        error.response?.data?.message || "An error occurred during Register",
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
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8889/api/dashboard", {
          withCredentials: true, // Send cookies with the request
        });
        if (response.data.loggedIn) {
          // Redirect to Register if not logged in
          navigate("/dashboard");
        } 
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer />
      <form
        className="w-fit lg:w-[400px] rounded-sm flex flex-col gap-5 border-2 border-yellow h-fit p-5 text-md lg:text-lg"
        onSubmit={handleRegister}
      >
        <div>
          <h1 className="text-center font-bold text-xl">Register as Admin</h1>
        </div>
        <div className="flex flex-col">
        <div className="flex flex-col">
          <label htmlFor="Username">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="mt-4 w-full h-[32px] lg:h-[40px] bg-gray-100"
            // minLength={8}
            required
          />
        </div>
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
          <label htmlFor="companyname">Company name</label>
          <input
            type="text"
            name="companyname"
            value={formData.companyname}
            onChange={(e) =>
              setFormData({ ...formData, companyname: e.target.value })
            }
            className="mt-4 w-full h-[32px] lg:h-[40px] bg-gray-100"
            // minLength={8}
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
            minLength={8}
            required
          />
          </div>
          
        <div className="flex flex-col">
          <button
            type="submit"
            className="mt-5 bg-blue-900 hover:bg-blue-700 h-[40px] lg:h-[50px] rounded-xl text-white"
          >
            Register
          </button>
        </div>
        <a href="#" className="ml-28 text-blue-900">
            Forgot password
          </a>
        <div className="flex flex-row gap-14 text-blue-900">
          <a className="ml-16" href="/">Login </a> 
          <a href="/managerregister">Register as Manager</a>
        </div>
      </form>
    </div>
  );
}

export default Register;
