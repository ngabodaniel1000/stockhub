import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [userProfile, setUserProfile] = useState(null); // Initialize with null for clarity
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
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8889/api/logout", {
        withCredentials: true,
      });
      alert("You have successfully logged out.");
      navigate("/"); // Redirect to login after logout
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

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
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
