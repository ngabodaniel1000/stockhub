import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const [userProfile, setUserProfile] = useState({}); // Initialize with null for clarity
  const [error, setError] = useState(null); // For error handling
  const navigate = useNavigate();


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


  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Dashboard</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : userProfile ? (
        <div className="mt-4">
          <p>
            <strong>Username:</strong> {userProfile.user}
          </p>
          <p>
            <strong>Email:</strong> {userProfile.email}
          </p>
          <p>
            <strong>Role:</strong> {userProfile.role}
          </p>
          <p>
            <strong>User ID:</strong> {userProfile.userId}
          </p>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
      <Link to={`/updateprofile/${userProfile.userId}`}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Update Profile
      </Link>
    </div>
  );
}

export default Profile;
