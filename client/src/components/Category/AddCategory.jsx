import React, { useState } from 'react';
import axios from 'axios';

function AddCategory() {
    const [newCategory, setNewCategory] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:8889/api/category/add', {
                categoryname: newCategory,
            },
        {withCredentials:true}
        );

            if (response.data.success) {
                setSuccessMessage(response.data.message);
                setNewCategory('');
                setError(null);
            } else {
                setError(response.data.message);
                setSuccessMessage(null);
            }
        } catch (err) {
            setError('An error occurred while adding the category.');
            setSuccessMessage(null);
        }
    };

    return (
        <div>
            <h1>Category</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            
            <form onSubmit={handleAddCategory} className='mb-4'>
                <input
                    type='text'
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder='Enter new category'
                    className='p-2 border border-gray-400 rounded mr-2'
                    required
                />
                <button type='submit' className='p-2 bg-blue-500 text-white rounded'>
                    Add Category
                </button>
            </form>
        </div>
    );
}

export default AddCategory;