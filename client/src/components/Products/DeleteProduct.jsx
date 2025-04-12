import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (!productId) {
      setError('Product ID is missing');
      setLoading(false);
      return;
    }
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8889/api/product/viewsingleitem/${productId}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setProduct(response.data.product);
      } else {
        setError(response.data.message || 'Failed to fetch product details');
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(err.response?.data?.message || 'Failed to fetch product details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to move this product to trash?')) {
      return;
    }

    setDeleteLoading(true);
    setError(null);

    try {
      const response = await axios.delete(
        `http://localhost:8889/api/product/delete/${productId}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        navigate('/products');
      } else {
        setError(response.data.message || 'Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err.response?.data?.message || 'Failed to delete product');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

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
    return <div className="container mx-auto p-4">Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Delete Product</h1>

      <div className="bg-white shadow-md rounded-lg px-6 py-4 mb-6">
        <p className="text-gray-700 text-lg mb-6 text-center">
          Are you sure you want to move this product to trash?
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <p className="font-semibold text-gray-600">Product Name:</p>
            <p className="text-gray-800">{product.productname}</p>
          </div>

          <div className="mb-4">
              <span className="font-semibold">Quantity:</span>
              <span className="ml-2">{product.quantity}</span>
            </div>

          <div>
            <p className="font-semibold text-gray-600">Category:</p>
            <p className="text-gray-800 capitalize">
              {product.category?.categoryname || 'Uncategorized'}
            </p>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleDelete}
            disabled={deleteLoading}
            className={`bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition ${
              deleteLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {deleteLoading ? 'Moving to Trash...' : 'Move to Trash'}
          </button>
          <button
            onClick={() => navigate('/products')}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
