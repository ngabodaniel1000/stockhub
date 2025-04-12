import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteSupplier = () => {
  const navigate = useNavigate();
  const { supplierId } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSupplier();
  }, [supplierId]);

  const fetchSupplier = async () => {
    try {
      const response = await axios.get(`http://localhost:8889/api/supplier/view/${supplierId}`,{withCredentials:true});
      if (response.data.success) {
        setSupplier(response.data.supplier);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Failed to fetch supplier details');
      console.error('Error fetching supplier:', err);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete(`http://localhost:8889/api/supplier/delete/${supplierId}`,{withCredentials:true});
      if (response.data.success) {
        navigate('/suppliers');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete supplier');
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
          onClick={() => navigate('/suppliers')}
          className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Suppliers
        </button>
      </div>
    );
  }

  if (!supplier) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Delete Supplier</h1>
      
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="text-gray-700 text-base mb-4">
          Are you sure you want to delete the following supplier?
        </p>
        
        <div className="mb-4">
          <p className="font-bold">Supplier Name:</p>
          <p className="text-gray-700">{supplier.name}</p>
        </div>
        
        <div className="mb-4">
          <p className="font-bold">Contact Email:</p>
          <p className="text-gray-700">{supplier.contactEmail}</p>
        </div>
        
        <div className="mb-4">
          <p className="font-bold">Phone:</p>
          <p className="text-gray-700">{supplier.phone}</p>
        </div>
        
        <div className="mb-4">
          <p className="font-bold">Address:</p>
          <p className="text-gray-700">{supplier.address}</p>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? 'Deleting...' : 'Delete Supplier'}
          </button>
          <button
            onClick={() => navigate('/suppliers')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSupplier; 