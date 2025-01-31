import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Updateprofile() {
    const [userProfile, setUserProfile] = useState([]); // Initialize with null for clarity
      const [error, setError] = useState(null); // For error handling
    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const response = await axios.get("http://localhost:8889/api/dashboard", {
              withCredentials: true, // Send cookies with the request
            });
            if (!response.data.loggedIn) {
              // Redirect to login if not logged in
              navigate("/");
            } else {
              setUserProfile(response.data); // Set the profile data
            }
          } catch (err) {
            setError("Failed to fetch user profile.");
            console.error("Error fetching user profile:", err);
            navigate("/"); // Redirect to login on error
          }
        };
    
        fetchUserProfile();
      }, []);
     // State to store form data
      const [formData, setFormData] = useState({
        email: "",
        password: "",
        role:"Admin",
        company:"",
        username:""


      });
      const {userId} = useParams()
    const updateprofile = async(e)=>{
        e.preventDefault();

        console.log("Submitting form with the following data:", formData);
        try {
            const response = await axios.put(`http://localhost:8889/api/account/updateprofile/${userId}`,{
                formData
            })
            if (response) {
                alert("profile data was updated")
            }
            
        } catch (error) {
           console.log(error);
            
        }
       }
       
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="w-fit lg:w-[400px] rounded-sm flex flex-col gap-5 border-2 border-yellow h-fit p-5 text-md lg:text-lg"
        onSubmit={updateprofile}
      >
        <div>
          <h1 className="text-center font-bold text-xl">Update your profile</h1>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={userProfile.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="mt-4 w-full h-[32px] lg:h-[40px] bg-gray-100"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="Username">Username</label>
          <input
            type="text"
            name="username"
            defaultValue={userProfile.user}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="mt-4 w-full h-[32px] lg:h-[40px] bg-gray-100"
            // minLength={8}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="companyname">Company name</label>
          <input
            type="text"
            name="companyname"
            defaultValue={userProfile.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            className="mt-4 w-full h-[32px] lg:h-[40px] bg-gray-100"
            // minLength={8}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            defaultValue={userProfile.password}
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
            Update profile
          </button>
        </div>
      </form>
    </div>
   
  )
}

export default Updateprofile