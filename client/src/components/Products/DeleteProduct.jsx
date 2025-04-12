import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8889/api/product/viewsingleitem/${productId}`,{withCredentials:true});
      if (response.data.success) {
        setProduct(response.data.product[0]);
      } else {
        setError('Product not found');
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to fetch product details');
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete(`http://localhost:8889/api/product/delete/${productId}`,{withCredentials:true});
      if (response.data.success) {
        navigate('/products');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <button
          onClick={() => navigate('/products')}
          className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Products
        </button>
      </div>
    );
  }

  if (!product) {
    return <div className="container mx-auto p-4">Loading.....</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Delete Product</h1>
      
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="text-gray-700 text-base mb-4">
          Are you sure you want to delete the following product?
        </p>
        
        <div className="mb-4">
          <p className="font-bold">Product Name:</p>
          <p className="text-gray-700">{product.productname}</p>
        </div>
        
        <div className="mb-4">
          <p className="font-bold">Price:</p>
          <p className="text-gray-700">${product.price}</p>
        </div>
        
        <div className="mb-4">
          <p className="font-bold">Category:</p>
          <p className="text-gray-700">{product.category}</p>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? 'Deleting...' : 'Delete Product'}
          </button>
          <button
            onClick={() => navigate('/products')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct; 