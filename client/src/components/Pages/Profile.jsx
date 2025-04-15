import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faUser, faEnvelope, faKey, faIdCard, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Profile({ darkmode }) {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8889/api/dashboard", {
          withCredentials: true,
        });
        if (!response.data.loggedIn) {
          navigate("/");
        } else {
          setUserProfile(response.data);
        }
      } catch (err) {
        setError("Failed to fetch user profile.");
        console.error("Error fetching user profile:", err);
        navigate("/");
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className={`min-h-screen p-8 ${darkmode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">User Profile</h1>
        
        {error ? (
          <div className={`p-4 rounded-lg mb-4 ${darkmode ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800'}`}>
            {error}
          </div>
        ) : userProfile ? (
          <div className={`p-6 rounded-lg mb-6 ${darkmode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className="space-y-6">
              {/* Username Section */}
              <div className={`flex items-center justify-between p-4 rounded-lg ${darkmode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon 
                    icon={faUser} 
                    className={`text-xl ${darkmode ? 'text-blue-400' : 'text-blue-600'}`} 
                  />
                  <div>
                    <h3 className="font-medium">Username</h3>
                    <p className={darkmode ? 'text-gray-300' : 'text-gray-600'}>{userProfile.user}</p>
                  </div>
                </div>
              </div>
              
              {/* Email Section */}
              <div className={`flex items-center justify-between p-4 rounded-lg ${darkmode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon 
                    icon={faEnvelope} 
                    className={`text-xl ${darkmode ? 'text-blue-400' : 'text-blue-600'}`} 
                  />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className={darkmode ? 'text-gray-300' : 'text-gray-600'}>{userProfile.email}</p>
                  </div>
                </div>
              </div>
              
              {/* Role Section */}
              <div className={`flex items-center justify-between p-4 rounded-lg ${darkmode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon 
                    icon={faKey} 
                    className={`text-xl ${darkmode ? 'text-blue-400' : 'text-blue-600'}`} 
                  />
                  <div>
                    <h3 className="font-medium">Role</h3>
                    <p className={darkmode ? 'text-gray-300' : 'text-gray-600'}>{userProfile.role}</p>
                  </div>
                </div>
              </div>
              
              {/* Company ID Section */}
              <div className={`flex items-center justify-between p-4 rounded-lg ${darkmode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon 
                    icon={faIdCard} 
                    className={`text-xl ${darkmode ? 'text-blue-400' : 'text-blue-600'}`} 
                  />
                  <div>
                    <h3 className="font-medium">Company ID</h3>
                    <p className={darkmode ? 'text-gray-300' : 'text-gray-600'}>{userProfile.company}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Link 
                to={`/updateprofile/${userProfile.userId}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkmode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
                Update Profile
              </Link>
            </div>
          </div>
        ) : (
          <div className={`p-4 rounded-lg ${darkmode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <p className={darkmode ? 'text-gray-300' : 'text-gray-600'}>Loading user profile...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;