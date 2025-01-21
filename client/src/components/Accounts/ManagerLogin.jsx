import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ManagerLogin() {
  // creating form data to store form state
  const [formdata,Setformdata] = useState({
    password:"",
    email:""
  })

  // function to handle login
const handlelogin= async(event)=>{
   event.preventDefault();
   console.log(formdata); 
   try {
    const response = await axios.post("http://localhost:8889/api/account/login", {
      email:formdata.email,
      password:formdata.password,
    }, { withCredentials: true });

    if (response.status === 200) {
      toast.success("Successfully logged in!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/dashboard');
    } else {
      toast.error(response.data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error) {
    toast.error(error.response?.data || "An error occurred during login", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};


  return (
    // functional component that return well styled form
    <div className='flex items-center justify-center min-h-screen'>
      <form className='w-fit lg:w-[400px] rounded-sm flex flex-col gap-5 border-2 border-yellow h-fit p-5 text-md lg:text-lg'>
        <div>
          <h1 className='text-center font-bold text-xl'>Login as Manager</h1>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="email">Email</label>
          <input type="email" name='email' onChange={(e)=>{
            Setformdata({...formdata,email:e.target.value})
          }} className='mt-4 w-full h-[32px] lg:h-[40px] bg-gray-100'/>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="password">Password</label>
          <input type="password" name='password' minLength={8} onChange={(e)=>{
            Setformdata({...formdata,password:e.target.value})
          }} className='mt-4 w-full h-[32px] lg:h-[40px] bg-gray-100'/>
        </div>
        <div className='flex flex-col'>
        <button type='submit' onClick={handlelogin} className='mt-5 bg-blue-900 hover:bg-blue-700 h-[40px] lg:h-[50px] rounded-xl text-white'>Login</button>
        </div>
        <div className='flex flex-row gap-10 text-blue-900'>
          <a href="#" className='ml-5'>Forget password</a>
          <a href="/">Login as Admin</a>
        </div>
      </form>
    </div>
  )
}

// exporting Login components
export default ManagerLogin