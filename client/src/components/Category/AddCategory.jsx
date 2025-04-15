import React, { useState } from 'react';
import axios from 'axios';

function AddCategory({ darkmode }) {
    const [newCategory, setNewCategory] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const response = await axios.post('http://localhost:8889/api/category/add', {
                categoryname: newCategory,
            }, { withCredentials: true });

            if (response.data.success) {
                setSuccessMessage(response.data.message);
                setNewCategory('');
                setTimeout(() => setSuccessMessage(null), 3000);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while adding the category.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 min-h-screen">
            <h1 className={`${darkmode ? "text-white" : "text-black"} text-2xl font-bold mt-10 lg:ml-[200px] mb-10`}>
                Add New Category
            </h1>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-md lg:ml-[200px]">
                    {error}
                </div>
            )}
            
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 max-w-md lg:ml-[200px]">
                    {successMessage}
                </div>
            )}
            
            <form onSubmit={handleAddCategory} className={`${darkmode ? "shadow-sm shadow-gray-50" : ""} max-w-md p-10 rounded-lg shadow-md lg:ml-[200px]`}>
                <div className="mb-6">
                    <label className={`block ${darkmode ? "text-white" : "text-gray-700"} text-sm font-bold mb-2`}>
                        Category Name
                    </label>
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Enter category name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        {loading ? 'Adding...' : 'Add Category'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddCategory;