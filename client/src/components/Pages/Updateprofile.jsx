import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faSun, faMoon, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';

function Updateprofile() {
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);
    const [darkmode, setDarkmode] = useState(true);
    const { userId } = useParams();
    const navigate = useNavigate();

    // Toggle dark mode
    const handleToggleDarkMode = () => {
        setDarkmode(!darkmode);
    };

    // Form data state
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: ""
    });

    // Fetch user profile data
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
                    setFormData({
                        email: response.data.email,
                        username: response.data.user,
                        password: ""
                    });
                }
            } catch (err) {
                setError("Failed to fetch user profile.");
                console.error("Error fetching user profile:", err);
                navigate("/");
            }
        };

        fetchUserProfile();
    }, [navigate]);

    // Handle profile update
    const updateprofile = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.username) {
            toast.error("Email and username are required", {
                theme: darkmode ? 'dark' : 'light',
            });
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:8889/api/account/updateprofile/${userId}`,
                formData,
                { withCredentials: true }
            );

            if (response.data.success) {
                toast.success("Profile updated successfully It will be applied as you logged in next time", {
                    theme: darkmode ? 'dark' : 'light',
                });
                setTimeout(() => {
                    navigate('/profile');
                }, 2000);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to update profile", {
                theme: darkmode ? 'dark' : 'light',
            });
        }
    };

    return (
        <div className={`flex min-h-screen ${darkmode ? 'bg-gray-900' : 'bg-blue-50'} transition-all`}>
            <ToastContainer />

            

            {/* Form Section */}
            <div className={`w-full flex items-center justify-center p-8 ${darkmode ? 'bg-[#0a090e]' : 'bg-white'}`}>
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className={`text-2xl font-bold ${darkmode ? 'text-white' : 'text-blue-900'}`}>
                            Update Profile
                        </h1>
                        <p className={`mt-2 ${darkmode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Update your account information
                        </p>
                    </div>

                    {error && (
                        <div className={`mb-4 p-3 rounded-lg ${darkmode ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800'}`}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={updateprofile} className="space-y-6">
                        {/* Username Field */}
                        <div>
                            <label htmlFor="username" className={`block text-sm font-medium ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Username
                            </label>
                            <div className="mt-1 relative">
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${darkmode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className={`block w-full pl-10 pr-3 py-3 rounded-lg ${darkmode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'} border`}
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className={`block text-sm font-medium ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Email
                            </label>
                            <div className="mt-1 relative">
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${darkmode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className={`block w-full pl-10 pr-3 py-3 rounded-lg ${darkmode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'} border`}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className={`block text-sm font-medium ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                                New Password (leave blank to keep current)
                            </label>
                            <div className="mt-1 relative">
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${darkmode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <FontAwesomeIcon icon={faLock} />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className={`block w-full pl-10 pr-3 py-3 rounded-lg ${darkmode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'} border`}
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Updateprofile;