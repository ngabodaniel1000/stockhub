import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Category({ darkmode }) {
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    // Fetch user profile on component mount
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
    }, [navigate]);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get("http://localhost:8889/api/category/view", {
                    withCredentials: true,
                }); 
                
                if (response.data && response.data.allcategories) {
                    setCategories(response.data.allcategories);
                } else {
                    setError("No categories found");
                    setCategories([]);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
                // setError("Failed to fetch categories");
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, []);

    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

    return (
        <div className={`container mx-auto p-4 min-h-screen ${darkmode ? 'bg-gray-900' : 'bg-white'}`}>
            

            {categories.length === 0 ? (
                <div className={`${darkmode ? "text-white" : "text-gray-700"} text-center mt-20`}>
                    <p className="mb-4 text-lg font-medium">No categories found.</p>
                    <Link
                        to="/category/add"
                        className={`inline-block px-4 py-2 rounded-md ${
                            darkmode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                    >
                        Add a New Category
                    </Link>
                </div>
            ) : (
                <>
                <div className="flex justify-between items-center mb-4">
                <h1 className={`${darkmode ? "text-white" : "text-black"} text-2xl font-bold mt-10 lg:ml-[200px] mb-10`}>
                    Categories
                </h1>
                <Link 
                    to="/category/add" 
                    className={`px-4 py-2 rounded-md ${
                        darkmode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                >
                    Add New Category
                </Link>
            </div>
                    <div className={`mb-4 ${darkmode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Showing {categories.length} categories
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((category) => (
                            <div 
                                key={category._id} 
                                className={`border rounded-lg p-4 shadow-md ${
                                    darkmode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                                }`}
                            >
                                <h2 className={`${darkmode ? 'text-white' : 'text-gray-700'} font-bold mb-2`}>
                                    {category.categoryname}
                                </h2>
                                <div className="ml-20 flex gap-2">
                                    <Link
                                        to={`/category/update/${category._id}`}
                                        className={`px-3 py-1 rounded text-sm ${
                                            darkmode ? 
                                            'bg-yellow-600 hover:bg-yellow-700 text-white' : 
                                            'bg-yellow-500 hover:bg-yellow-600 text-white'
                                        }`}
                                    >
                                        Update
                                    </Link>
                                    <Link
                                        to={`/category/delete/${category._id}`}
                                        className={`px-3 py-1 rounded text-sm ${
                                            darkmode ? 
                                            'bg-red-600 hover:bg-red-700 text-white' : 
                                            'bg-red-500 hover:bg-red-600 text-white'
                                        }`}
                                    >
                                        Delete
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Category;