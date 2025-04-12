import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Stock = () => {
    const [stock, setStock] = useState([]);
    const [filteredStock, setFilteredStock] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [DeletingId,setDeletingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [sortOption, setSortOption] = useState('createdAt_desc');

    useEffect(() => {
        fetchStock();
    }, [sortOption]);

    const fetchStock = async () => {
        try {
            const [sortBy, sortOrder] = sortOption.split('_');
            const response = await axios.get('http://localhost:8889/api/stock/view', {
                params: {
                    sortBy,
                    sortOrder,
                    status: statusFilter,
                    search: searchTerm
                },
                withCredentials: true
            });
            if (response.data.success) {
                const nonDeletedStock = response.data.stock.filter(item => !item.isDeleted);
                setStock(nonDeletedStock);
                setFilteredStock(nonDeletedStock);
            }
        } catch (err) {
            setError('Failed to fetch stock data');
            console.error('Error fetching stock:', err);
        } finally {
            setLoading(false);
        }
    };

    // Client-side filtering for better responsiveness
    useEffect(() => {
        let result = [...stock];
        
        // Search filter
        if (searchTerm) {
            result = result.filter(item => 
                item.product?.productname?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Status filter
        if (statusFilter) {
            result = result.filter(item => item.status === statusFilter);
        }
        
        setFilteredStock(result);
    }, [searchTerm, statusFilter, stock]);

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };
    const handledelete = async (stockInId) => {
        if (!window.confirm('Are you sure you want to move this item to trash?')) {
            return;
        }

        setDeletingId(stockInId);
        try {
            const response = await axios.delete(
                `http://localhost:8889/api/stock/delete/${stockInId}`,
                { withCredentials: true }
            );
            
            if (response.data.success) {
                // Remove the deleted item from state instead of navigating
                setStock(stock.filter(item => item._id !== stockInId));
                setFilteredStock(filteredStock.filter(item => item._id !== stockInId));
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
                fetchStock();
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

            {/* Search and Filter Section */}
            <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search Input */}
                    <div>
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
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
                    
                    {/* Status Filter */}
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
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
                            <option value="received">Received</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                    
                    {/* Sort Options */}
                    <div>
                        <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
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

            {/* Results Count */}
            <div className="mb-4 text-sm text-gray-600">
                Showing {filteredStock.length} of {stock.length} stock entries
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStock.map((item) => (
                    <div key={item._id} className="border rounded-lg p-4 shadow-md">
                        <h2 className="text-xl font-semibold mb-2">{item.product?.productname}</h2>
                        <p className="text-gray-600 mb-2">Quantity: {item.quantity}</p>
                        <p className="text-gray-600 mb-2">Supplier: {item.supplier?.name}</p>
                        <p className="text-gray-600 mb-2">Received By: {item.receivedBy?.username}</p>
                        <p className="text-gray-600 mb-2">
                            Status: 
                            {item.status === 'pending' && (
                                <span className="ml-2 px-2 inline-flex text-md leading-5 font-semibold bg-yellow-100 text-yellow-800 rounded-full">{item.status}</span>
                            )}   
                            {item.status === 'received' && (
                                <span className="ml-2 px-2 inline-flex text-md leading-5 font-semibold bg-green-100 text-green-800 rounded-full">{item.status}</span>
                            )}   
                            {item.status === 'cancelled' && (
                                <span className="ml-2 px-2 inline-flex text-md leading-5 font-semibold bg-red-100 text-red-800 rounded-full">{item.status}</span>
                            )}   
                        </p>
                        <p className="text-gray-600 mb-4">
                            Date: {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                        {item.status === 'cancelled' || 'recieved' && (                            
                            <button 
                            onClick={() => handledelete(item._id)}
                                className='bg-red-500 text-sm text-white px-3 py-1 rounded hover:bg-red-800'
                            >
                                Move to trash
                            </button>
                        )}
                        <div>
                            {item.status === 'pending' && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleStatusUpdate(item._id, 'received')}
                                        className="bg-green-500 text-sm text-white px-3 py-1 rounded hover:bg-green-600"
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

            {/* Empty State */}
            {filteredStock.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500">No stock entries found matching your criteria.</p>
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

export default Stock;