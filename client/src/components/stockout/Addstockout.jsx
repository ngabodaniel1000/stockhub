import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddStockOut = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        quantity: '',
        customer: '',
        reason: 'sale'
    });
    const [customers, setCustomers] = useState([]);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch product details
                const productResponse = await axios.get(`http://localhost:8889/api/product/viewsingleitem/${productId}`, {
                    withCredentials: true
                });
                if (productResponse.data.success) {
                    setProduct(productResponse.data.product);
                }

                // Fetch customers
                const customersResponse = await axios.get('http://localhost:8889/api/customer/view', {
                    withCredentials: true
                });
                if (customersResponse.data.success) {
                    setCustomers(customersResponse.data.customers);
                }
            } catch (err) {
                setError('Failed to fetch required data');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:8889/api/stockout/add/${productId}`,
                formData,
                { withCredentials: true }
            );
            
            if (response.data.success) {
                navigate('/stockout');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to process stock out');
            console.error('Error processing stock out:', err);
        }
    };

    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
    if (!product) return <div className="text-center p-4">Product not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Process Stock Out for {product.productname}</h1>
            <p className="mb-4">Current Stock: {product.quantity}</p>
            
            <form onSubmit={handleSubmit} className="max-w-md bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                        Quantity
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        min="1"
                        max={product.quantity}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customer">
                        Customer (Optional)
                    </label>
                    <select
                        id="customer"
                        name="customer"
                        value={formData.customer}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select a customer</option>
                        {customers.map(customer => (
                            <option key={customer._id} value={customer._id}>
                                {customer.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reason">
                        Reason
                    </label>
                    <select
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="sale">Sale</option>
                        <option value="damaged">Damaged</option>
                        <option value="lost">Lost</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Process Stock Out
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStockOut;