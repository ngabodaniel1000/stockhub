import React, { useEffect, useState } from 'react'

function Login() {
  const [formdata,Setformdata] = useState({
    password:"",
    email:"",
    role:"Admin"
  })
const handlelogin= async(event)=>{
   event.preventDefault();
   console.log(formdata);
   
}
  useEffect(()=>{
     try {
      handlelogin()
     } catch (error) {
      console.log(error);
      
     } 
  },[])
  return (
    <div>
      <form className='border-2 border-yellow w-fit h-fit'>
        <div>
          <h1>Login as Admin</h1>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name='email' onChange={(e)=>{
            Setformdata({...formdata,email:e.target.value})
          }}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name='password' minLength={8} onChange={(e)=>{
            Setformdata({...formdata,password:e.target.value})
          }}/>
        </div>
        <div>
        <button type='submit' onClick={handlelogin} className='bg-blue-900'>Login</button>
        </div>
        <div className='flex flex-col'>
          <a href="#">Forget password</a>
          <a href="#">Login as Manager</a>
        </div>
      </form>
    </div>
  )
}

export default Login