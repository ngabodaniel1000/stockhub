import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ViewProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      const response = await axios.get(`http://localhost:8889/api/product/viewsingleitem/${productId}`, {
        withCredentials: true
      });
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

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button
          onClick={() => navigate('/products')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Products
        </button>
      </div>
    );
  }
  if (!product) return <div className="text-center p-4">Product not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Details</h1>
        <div className="flex gap-2">
          <Link
            to={`/product/update/${productId}`}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Update Product
          </Link>
          <Link
            to="/products"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back to Products
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">{product.productname}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            
            <div className="mb-4">
              <span className="font-semibold">Quantity:</span>
              <span className="ml-2">{product.quantity}</span>
            </div>

            <div className="mb-4">
              <span className="font-semibold">Category:</span>
              <span className="ml-2">{product.category?.categoryname || 'Uncategorized'}</span>
            </div>

            <div className="mb-4">
              <span className="font-semibold">Created At:</span>
              <span className="ml-2">{new Date(product.createdAt).toLocaleString()}</span>
            </div>

            <div className="mb-4">
              <span className="font-semibold">Last Updated:</span>
              <span className="ml-2">{new Date(product.updatedAt).toLocaleString()}</span>
            </div>
          </div>

          {/* {product.image && (
            <div className="flex justify-center items-center">
              <img
                src={product.image}
                alt={product.productname}
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ViewProduct; 