import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddStock = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        quantity: '',
        supplier: ''
    });
    const [suppliers, setSuppliers] = useState([]);
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

                // Fetch suppliers
                const suppliersResponse = await axios.get('http://localhost:8889/api/supplier/view', {
                    withCredentials: true
                });
                if (suppliersResponse.data.success) {
                    setSuppliers(suppliersResponse.data.suppliers);
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
                `http://localhost:8889/api/stock/add/${productId}`,
                formData,
                { withCredentials: true }
            );
            
            if (response.data.success) {
                navigate('/stock');
            }
        } catch (err) {
            setError('Failed to add stock');
            console.error('Error adding stock:', err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Add Stock for {product.productname}</h1>
            
            <form onSubmit={handleSubmit} className="max-w-md">
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
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="supplier">
                        Supplier
                    </label>
                    <select
                        id="supplier"
                        name="supplier"
                        value={formData.supplier}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Select a supplier</option>
                        {suppliers.map(supplier => (
                            <option key={supplier._id} value={supplier._id}>
                                {supplier.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Add Stock
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/stock')}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStock; 