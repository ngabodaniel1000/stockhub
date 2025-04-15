import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Stockout = ({darkmode,tr}) => {
    const [stockOut, setStockOut] = useState([]);
    const [filteredStockOut, setFilteredStockOut] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [sortOption, setSortOption] = useState('createdAt_desc');
    const [DeletingId, setDeletingId] = useState(null);
    const [updatingStatus, setUpdatingStatus] = useState(null);

    useEffect(() => {
        fetchStockOut();
    }, [sortOption]);

    const fetchStockOut = async () => {
        try {
            const [sortBy, sortOrder] = sortOption.split('_');
            const response = await axios.get('http://localhost:8889/api/stockout/view', {
                params: {
                    sortBy,
                    sortOrder,
                    status: statusFilter,
                    search: searchTerm
                },
                withCredentials: true
            });
            if (response.data.success) {
                const nonDeletedStock = response.data.stockOut.filter(item => !item.isDeleted);
                setStockOut(nonDeletedStock);
                setFilteredStockOut(nonDeletedStock);
            }
        } catch (err) {
            setError('Failed to fetch stock out data');
            console.error('Error fetching stock out:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let result = [...stockOut];

        if (searchTerm) {
            result = result.filter(item =>
                item.product?.productname?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter) {
            result = result.filter(item => item.status === statusFilter);
        }

        setFilteredStockOut(result);
    }, [searchTerm, statusFilter, stockOut]);

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handledelete = async (stockOutId) => {
        if (!window.confirm('Are you sure you want to move this item to trash?')) {
            return;
        }

        setDeletingId(stockOutId);
        try {
            const response = await axios.delete(
                `http://localhost:8889/api/stockout/delete/${stockOutId}`,
                { withCredentials: true }
            );

            if (response.data.success) {
                setStockOut(stockOut.filter(item => item._id !== stockOutId));
                setFilteredStockOut(filteredStockOut.filter(item => item._id !== stockOutId));
            } else {
                setError(response.data.message || 'Failed to delete stock');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete stock');
            console.error('Error deleting stock:', err);
        } finally {
            setDeletingId(null);
        }
    };

    const handleStatusUpdate = async (stockOutId, newStatus) => {
        setUpdatingStatus(stockOutId);
        try {
            const response = await axios.put(
                `http://localhost:8889/api/stockout/update/${stockOutId}`,
                { status: newStatus },
                { withCredentials: true }
            );

            if (response.data.success) {
                setStockOut(stockOut.map(item =>
                    item._id === stockOutId ? { ...item, status: newStatus } : item
                ));
                fetchStockOut();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update stock out status');
            console.error('Error updating stock out status:', err);
        } finally {
            setUpdatingStatus(null);
        }
    };

    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

    return (
        <div className="container mx-auto p-4 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h1 className={`${darkmode? "text-white" : "text-black"} text-2xl font-bold mt-10 mb-10`}>{tr("stockout")} Management</h1>
                <div className="flex gap-2">
                    <Link to="/products" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Back to Products
                    </Link>
                    <Link to="/stockout/add" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        Process Stock Out
                    </Link>
                </div>
            </div>

            <div className="mb-6 p-4 rounded-lg shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="search" className={`block ${darkmode?"text-white":"text-gray-700"}  text-sm font-bold mb-2`}>
                            Search Products
                        </label>
                        <input
                            type="text"
                            id="search"
                            placeholder="Search by product name..."
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="status" className={`block ${darkmode?"text-white":"text-gray-700"}  text-sm font-bold mb-2`}>
                            Filter by Status
                        </label>
                        <select
                            id="status"
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="processed">Processed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="sort" className={`block ${darkmode?"text-white":"text-gray-700"}  text-sm font-bold mb-2`}>
                            Sort By
                        </label>
                        <select
                            id="sort"
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            value={sortOption}
                            onChange={handleSortChange}
                        >
                            <option value="createdAt_desc">Newest First</option>
                            <option value="createdAt_asc">Oldest First</option>
                            <option value="quantity_desc">Quantity (High to Low)</option>
                            <option value="quantity_asc">Quantity (Low to High)</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className={`block ${darkmode?"text-white":"text-gray-700"}  text-sm font-normal mb-2`}>
                Showing {filteredStockOut.length} of {stockOut.length} stock out entries
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStockOut.map((item) => (
                    <div key={item._id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                       <h2 className={`block ${darkmode?"text-white":"text-gray-700"} text-md font-bold mb-2`}>{item.product?.productname}</h2>
                       <p className={`block ${darkmode ? "text-white" : "text-gray-700"} text-md mb-2`}>Quantity: {item.quantity}</p>
                        {item.customer && (
                            <p className={`block ${darkmode?"text-white":"text-gray-700"}  text-sm font-normal mb-2`}>Customer: {item.customer?.name}</p>
                        )}
                        <p className={`block ${darkmode?"text-white":"text-gray-700"}  text-sm font-normal mb-2`}>Processed By: {item.processedBy?.username}</p>
                        <p className={`block ${darkmode?"text-white":"text-gray-700"}  text-sm font-normal mb-2`}>
                            Reason: <span className="capitalize">{item.reason}</span>
                        </p>
                        <p className={`block ${darkmode?"text-white":"text-gray-700"}  text-sm font-normal mb-2`}>
                            Status:
                            {item.status === 'pending' && (
                                <span className="ml-2 px-2 inline-flex text-md leading-5 font-semibold bg-yellow-100 text-yellow-800 rounded-full">{item.status}</span>
                            )}
                            {item.status === 'processed' && (
                                <span className="ml-2 px-2 inline-flex text-md leading-5 font-semibold bg-green-100 text-green-800 rounded-full">{item.status}</span>
                            )}
                            {item.status === 'cancelled' && (
                                <span className="ml-2 px-2 inline-flex text-md leading-5 font-semibold bg-red-100 text-red-800 rounded-full">{item.status}</span>
                            )}
                        </p>
                        <p className={`block ${darkmode?"text-white":"text-gray-700"}  text-sm font-normal mb-2`}>
                            Date: {new Date(item.createdAt).toLocaleDateString()}
                        </p>

                        {item.status === 'cancelled' && (
                            <button
                                onClick={() => handledelete(item._id)}
                                className='bg-red-500 text-sm text-white px-3 py-1 rounded hover:bg-red-800'
                            >
                                Move to Trash
                            </button>
                        )}

                        {item.status === 'pending' && (
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => handleStatusUpdate(item._id, 'processed')}
                                    className="bg-green-500 text-sm text-white px-3 py-1 rounded hover:bg-green-600"
                                >
                                    Mark as Processed
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
                ))}
            </div>

            {filteredStockOut.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500">No stock out entries found matching your criteria.</p>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setStatusFilter('');
                        }}
                        className="mt-2 text-blue-500 hover:text-blue-700"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default Stockout;
