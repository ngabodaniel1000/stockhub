import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ViewSingleCategory() {
    const [userProfile, setUserProfile] = useState(null); // Initialize with null for clarity
    const [error, setError] = useState(null); // For error handling
    const navigate = useNavigate();
    const [category, setCategory] = useState({}); 
    const {categoryid} = useParams()
    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://localhost:8889/api/category/viewsingleitem/${categoryid}`, {
                    withCredentials: true, // Send cookies with the request
                }); 
                if (response.status === 200) {
                    setCategory(response.data.viewcategory); // Corrected function name (Setcategory -> setCategory)
                }
            } catch (error) {
                console.error("Error fetching categories:", error); // Added error message for clarity
            }
        };

        fetchCategory(); // Call the fetchCategory function
    }, []); // Empty dependency array to run only once on mount

    console.log(category);

    return (
        <div>
            <h1>Single Category</h1>
            
            <table className='bg-gray-700 text-white w-full border-collapse'>
                <thead>
                    <tr className='bg-gray-800'>
                        <th className='p-2 border-b border-gray-600' style={{ width: '10%' }}>#</th>
                        <th className='p-2 border-b border-gray-600' style={{ width: '45%' }}>Category Name</th>
                        <th className='p-2 border-b border-gray-600' style={{ width: '45%' }}>Operation</th>
                    </tr>
                </thead>
                <tbody>
                   
                    <tr key={category._id} className='hover:bg-gray-600'>
                        <td className='p-2 border-b border-gray-600' style={{ width: '10%' }}>{1}</td>
                        <td className='p-2 border-b  text-center border-gray-600' style={{ width: '45%' }}>{category.categoryname}</td>
                        <td className='p-2 border-b border-gray-600 text-center' style={{ width: '45%' }}>
                            <a href={`/category/delete/${category._id}`} className='text-blue-500 hover:underline'>Delete</a>
                            <a href={`/category/update/${category._id}`} className='ml-4 text-blue-500 hover:underline'>Update</a>
                        </td>
                    </tr>
                   
                </tbody>
            </table>
        </div>
    );
}

export default ViewSingleCategory;