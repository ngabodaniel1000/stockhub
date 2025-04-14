import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Category() {
    const [userProfile, setUserProfile] = useState(null); // Initialize with null for clarity
    const [error, setError] = useState(null); // For error handling
    const navigate = useNavigate();
    const [category, setCategory] = useState([]); // Corrected variable name (Setcategory -> setCategory)

    // Fetch user profile on component mount
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
    }, [navigate]); // Added `navigate` to dependency array

    console.log(userProfile);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get("http://localhost:8889/api/category/view", {
                    withCredentials: true, // Send cookies with the request
                }); 
                if (response.status === 200) {
                    setCategory(response.data.allcategories); // Corrected function name (Setcategory -> setCategory)
                }
            } catch (error) {
                console.error("Error fetching categories:", error); // Added error message for clarity
            }
        };

        fetchCategory(); // Call the fetchCategory function
    }, []); // Empty dependency array to run only once on mount

    console.log(category);

    return (
        <div className='min-h-screen'>
            <h1>Category</h1>
            <a href="/category/add" className='text-blue-900'>Add New Category</a>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if any */}
            <table className='bg-gray-700 text-white w-full border-collapse'>
                <thead>
                    <tr className='bg-gray-800'>
                        <th className='p-2 border-b border-gray-600' style={{ width: '10%' }}>#</th>
                        <th className='p-2 border-b border-gray-600' style={{ width: '45%' }}>Category Name</th>
                        <th className='p-2 border-b border-gray-600' style={{ width: '45%' }}>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {category.map((cat, index) => ( // Render the list of categories
                    <tr key={cat._id} className='hover:bg-gray-600'>
                        <td className='p-2 border-b border-gray-600' style={{ width: '10%' }}>{index + 1}</td>
                        <td className='p-2 border-b  text-center border-gray-600' style={{ width: '45%' }}>{cat.categoryname}</td>
                        <td className='p-2 border-b border-gray-600 text-center' style={{ width: '45%' }}>
                            <a href={`/category/viewcategory/${cat._id}`} className='text-blue-500 hover:underline'>View</a>
                            <a href={`/category/delete/${cat._id}`} className='text-blue-500 hover:underline'>Delete</a>
                            <a href={`/category/update/${cat._id}`} className='ml-4 text-blue-500 hover:underline'>Update</a>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Category;