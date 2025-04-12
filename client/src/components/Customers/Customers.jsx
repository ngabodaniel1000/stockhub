import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8889/api/customer/view', { withCredentials: true });
      if (response.data.success) {
        setCustomers(response.data.customers);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Failed to fetch customers');
      console.error('Error fetching customers:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Customers</h1>
        <Link to="/customer/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add New Customer
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map((customer) => (
          <div key={customer._id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">{customer.name}</h2>
            <p className="text-gray-600 mb-2">Email: {customer.contactEmail}</p>
            <p className="text-gray-600 mb-2">Phone: {customer.phone}</p>
            <p className="text-gray-600 mb-4">Address: {customer.address}</p>
            <div className="flex gap-2">
              <Link
                to={`/customer/view/${customer._id}`}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                View
              </Link>
              <Link
                to={`/customer/update/${customer._id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Update
              </Link>
              <Link
                to={`/customer/delete/${customer._id}`}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers; 