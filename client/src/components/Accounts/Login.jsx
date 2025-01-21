import React, { useEffect, useState } from 'react'

function Login() {
  // creating form data to store form state
  const [formdata,Setformdata] = useState({
    password:"",
    email:""
  })

  // function to handle login
const handlelogin= async(event)=>{
   event.preventDefault();
   console.log(formdata); 
}

// effect to submit data to database
  useEffect(()=>{
     try {
      handlelogin()
     } catch (error) {
      console.log(error);
      
     } 
  },[])
  return (
    // functional component that return well styled form
    <div className='flex items-center justify-center min-h-screen'>
      <form className='w-fit lg:w-[400px] rounded-sm flex flex-col gap-5 border-2 border-yellow h-fit p-5 text-md lg:text-lg'>
        <div>
          <h1 className='text-center font-bold text-xl'>Login as Admin</h1>
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
          <a href="/managerlogin">Login as Manager</a>
        </div>
      </form>
    </div>
  )
}

// exporting Login components
export default Login