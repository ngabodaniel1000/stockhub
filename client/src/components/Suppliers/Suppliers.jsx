import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Suppliers = (darkmode) => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('http://localhost:8889/api/supplier/view',{withCredentials:true});
      if (response.data.success) {
        setSuppliers(response.data.suppliers);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Failed to fetch suppliers');
      console.error('Error fetching suppliers:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="flex justify-between items-center mb-4">
      <h1 className={`${darkmode? "text-white" : "text-black"} text-2xl font-bold mt-10 lg:ml-[200px] mb-10`}>Suppliers</h1>
        <Link to="/supplier/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add New Supplier
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suppliers.map((supplier) => (
          <div key={supplier._id} className="border rounded-lg p-4 shadow-md">
            <h2 className={`${darkmode ? 'text-white':'text-gray-700'} font-bold mb-2`}>{"supplier.name"}</h2>
            <p className={`${darkmode ? 'text-white':'text-gray-700'} mb-2`}>Email: {supplier.contactEmail}</p>
            <p className={`${darkmode ? 'text-white':'text-gray-700'} mb-2`}>Phone: {supplier.phone}</p>
            <p className={`${darkmode ? 'text-white':'text-gray-700'} mb-2`}>Address: {supplier.address}</p>
            <div className="flex gap-2 ml-20">
              <Link
                to={`/supplier/update/${supplier._id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Update
              </Link>
              <Link
                to={`/supplier/delete/${supplier._id}`}
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

export default Suppliers; 