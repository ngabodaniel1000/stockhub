import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    productname: '',
    description: '',
    quantity: 0,
    category: '',
    image: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8889/api/product/viewsingleitem/${productId}`, {
        withCredentials: true
      });
      if (response.data.success) {
        const product = response.data.product;
        setFormData({
          productname: product.productname,
          description: product.description,
          quantity: product.quantity,
          category: product.category,
          image: product.image || ''
        });
      }
    } catch (err) {
      setError('Failed to fetch product details');
      console.error('Error fetching product:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8889/api/category/view', {
        withCredentials: true
      });
      if (response.data.success) {
        setCategories(response.data.allcategories);
      }
    } catch (err) {
      setError('Failed to fetch categories');
      console.error('Error fetching categories:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `http://localhost:8889/api/product/update/${productId}`,
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        navigate('/products');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product');
      console.error('Error updating product:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Product</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="productname"
            value={formData.productname}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="0"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.categoryname}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? 'Updating...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct; 