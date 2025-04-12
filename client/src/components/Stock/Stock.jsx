import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Stock = () => {
    const [stock, setStock] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStock();
    }, []);

    const fetchStock = async () => {
        try {
            const response = await axios.get('http://localhost:8889/api/stock/view', {
                withCredentials: true
            });
            if (response.data.success) {
                setStock(response.data.stock);
            }
        } catch (err) {
            setError('Failed to fetch stock data');
            console.error('Error fetching stock:', err);
        } finally {
            setLoading(false);
        }
    };
//    const handledelete = async(stockId)=> {
//         try {
//             const response = await axios.delete(`http://localhost:8889/api/stock/delete/${stockId}`,{withCredentials:true});
//             if (response.data.success) {
//               navigate('/stock');
//             } else {
//               setError(response.data.message);
//             }
//           } catch (err) {
//             setError(err.response?.data?.message || 'Failed to delete stockin');
//           } finally {
//             setLoading(false);
//           }
//         };
    

    const handleStatusUpdate = async (stockId, newStatus) => {
        try {
            const response = await axios.put(
                `http://localhost:8889/api/stock/update/${stockId}`,
                { status: newStatus },
                { withCredentials: true }
            );
            
            if (response.data.success) {
                setStock(stock.map(item => 
                    item._id === stockId ? { ...item, status: newStatus } : item
                ));
                fetchStock(); // Refresh the stock list to get updated product quantities
            }
        } catch (err) {
            setError('Failed to update stock status');
            console.error('Error updating stock status:', err);
        }
    };

    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Stock Management</h1>
                <Link to="/products" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Back to Products
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stock.map((item) => (
                    <div key={item._id} className="border rounded-lg p-4 shadow-md">
                        <h2 className="text-xl font-semibold mb-2">{item.product?.productname}</h2>
                        <p className="text-gray-600 mb-2">Quantity: {item.quantity}</p>
                        <p className="text-gray-600 mb-2">Supplier: {item.supplier.name}</p>
                        <p className="text-gray-600 mb-2">Received By: {item.receivedBy?.username}</p>
                        <p className="text-gray-600 mb-2">
                            Status: 
                            {item.status === 'pending' && (
                                <span className="ml-2 px-2 inline-flex text-md leading-5 font-semibold bg-yellow-100 text-yellow-800  rounded-full">{item.status}</span>
                                )}   
                            {item.status === 'received' && (
                                <span className="ml-2 px-2 inline-flex text-md leading-5 font-semibold bg-yellow-100 text-green-500  rounded-full">{item.status}</span>
                                )}   
                            {item.status === 'cancelled' && (
                                <span className="ml-2 px-2 inline-flex text-md leading-5 font-semibold bg-yellow-100 text-red-500  rounded-fulld">{item.status}</span>
                                )}   
                        </p>
                        <p className="text-gray-600 mb-4">
                            Date: {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                        {item.status === 'cancelled' && (                            
                                  <button 
                                //   onClick={handledelete(item._id)} 
                                  className='bg-red-500 text-sm text-white px-3 py-1 rounded hover:bg-red-800'>Move to trash</button>
                              )}
                        <div>
                            {item.status === 'pending' && (
                                <div className="flex gap-2">
                                <button
                                    onClick={() => handleStatusUpdate(item._id, 'received')}
                                    className="bg-green-500 txt-sm text-white px-3 py-1 rounded hover:bg-green-600"
                                >
                                    Mark as Received
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(item._id, 'cancelled')}
                                    className="bg-red-500 text-sm text-white px-3 py-1 rounded hover:bg-red-800"
                                >
                                    Mark as Cancelled
                                </button>
                              
                            
                                </div>
                            )}
                        
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stock; 