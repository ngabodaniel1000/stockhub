import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCustomer = (darkmode) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    contactEmail: '',
    phone: '',
    address: '',
    company: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  const fetchCustomer = async () => {
    try {
      const response = await axios.get(`http://localhost:8889/api/customer/view/${id}`, { withCredentials: true });
      if (response.data.success) {
        setFormData(response.data.customer);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Failed to fetch customer details');
      console.error('Error fetching customer:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8889/api/customer/update/${id}`, formData, { withCredentials: true });
      if (response.data.success) {
        navigate('/customers');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Failed to update customer');
      console.error('Error updating customer:', err);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className={`${darkmode? "text-white" : "text-black"} lg:text-lg font-bold mt-10 ml-20 lg:ml-[200px] mb-10`}>Update Customer</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className={`${darkmode ?"shadow-sm shadow-gray-50":""} max-w-md p-10 rounded-lg shadow-md lg:ml-[200px]`}>
        <div className="mb-4">
          <label className={`block ${darkmode?"text-white":"text-gray-700"}  text-sm font-bold mb-2`}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className={`block ${darkmode?"text-white":"text-gray-700"}  text-sm font-bold mb-2`}>Email</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className={`block ${darkmode?"text-white":"text-gray-700"}  text-sm font-bold mb-2`}>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className={`block ${darkmode?"text-white":"text-gray-700"}  text-sm font-bold mb-2`}>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Customer
        </button>
      </form>
    </div>
  );
};

export default UpdateCustomer; 