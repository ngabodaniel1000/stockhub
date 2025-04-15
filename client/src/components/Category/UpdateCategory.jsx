import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateCategory({ darkmode }) {
    const { categoryid } = useParams();
    const [category, setCategory] = useState({});
    const [newCategory, setNewCategory] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch category on component mount
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://localhost:8889/api/category/viewsingleitem/${categoryid}`, {
                    withCredentials: true,
                });
                if (response.status === 200) {
                    setCategory(response.data.viewcategory);
                    setNewCategory(response.data.viewcategory.categoryname); // Pre-fill input
                }
            } catch (error) {
                setError('Failed to fetch category details.');
                console.error("Error fetching category:", error);
            }
        };

        fetchCategory();
    }, [categoryid]);

    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.put(`http://localhost:8889/api/category/update/${categoryid}`, {
                categoryname: newCategory,
            }, {
                withCredentials: true,
            });

            if (response.data.success) {
                setSuccessMessage('Category updated successfully!');
                setTimeout(() => {
                    setSuccessMessage(null);
                    navigate('/category');
                }, 2000);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while updating the category.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 min-h-screen">
            <h1 className={`${darkmode ? "text-white" : "text-black"} text-2xl font-bold mt-10 lg:ml-[200px] mb-10`}>
                Update Category
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

            <form onSubmit={handleUpdateCategory} className={`${darkmode ? "shadow-sm shadow-gray-50" : ""} max-w-md p-10 rounded-lg shadow-md lg:ml-[200px]`}>
                <div className="mb-6">
                    <label className={`block ${darkmode ? "text-white" : "text-gray-700"} text-sm font-bold mb-2`}>
                        Category Name
                    </label>
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Enter new category name"
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
                        {loading ? 'Updating...' : 'Update Category'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateCategory;
