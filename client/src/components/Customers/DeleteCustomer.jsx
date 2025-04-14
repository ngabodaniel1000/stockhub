import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteCustomer = (darkmode) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  const fetchCustomer = async () => {
    try {
      const response = await axios.get(`http://localhost:8889/api/customer/view/${id}`, { withCredentials: true });
      if (response.data.success) {
        setCustomer(response.data.customer);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Failed to fetch customer details');
      console.error('Error fetching customer:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8889/api/customer/delete/${id}`, { withCredentials: true });
      if (response.data.success) {
        navigate('/customers');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Failed to delete customer');
      console.error('Error deleting customer:', err);
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
  if (!customer) return <div className="text-center p-4">Customer not found</div>;

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Delete Customer</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this customer?</h2>
        <div className="mb-4">
          <p className="text-gray-600">Name: {customer.name}</p>
          <p className="text-gray-600">Email: {customer.contactEmail}</p>
          <p className="text-gray-600">Phone: {customer.phone}</p>
          <p className="text-gray-600">Address: {customer.address}</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={() => navigate('/customers')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCustomer; 