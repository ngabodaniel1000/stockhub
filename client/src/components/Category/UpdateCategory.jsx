import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function UpdateCategory() {
    const {categoryid} = useParams()
    const [category, setCategory] = useState([]);
     const [newCategory, setNewCategory] = useState('');
    const navigate = useNavigate()

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
        console.log(category)
    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.put(`http://localhost:8889/api/category/update/67d2e969126fe0ffb8530412`, {
                categoryname: newCategory,
            },
        {withCredentials:true}
        );

            if (response.data.success) {
               navigate("/category")
            } else {
                alert(response.data.message);
                
            }
        } catch (err) {
           console.log(err);
        }
    };
  return (
    <div>UpdateCategory {categoryid}
            <form onSubmit={handleUpdateCategory} className='mb-4'>
                <input
                    type='text'
                    defaultValue={category.categoryname}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder='Enter new category'
                    className='p-2 border border-gray-400 rounded mr-2'
                    required
                />
                <button type='submit' className='p-2 bg-blue-500 text-white rounded'>
                    Update Category
                </button>
            </form>
    </div>
  )
}

export default UpdateCategory