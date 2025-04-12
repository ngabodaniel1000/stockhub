import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('createdAt_desc');

  // Fetch products and categories on component mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8889/api/category/view', {
        withCredentials: true
      });
      if (response.data.success) {
        setCategories(response.data.allcategories);
      }
    } catch (err) {
      setError('Failed to fetch categories');
      console.error('Error fetching categories:', err);
    }
  };

  // Apply filters and sorting whenever dependencies change
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.productname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => 
        product.category?._id === selectedCategory
      );
    }
    
    // Apply sorting
    result = sortProducts(result, sortOption);
    
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products, sortOption]);

  // Sort products based on the selected option
  const sortProducts = (productsToSort, option) => {
    const [sortBy, sortOrder] = option.split('_');
    const direction = sortOrder === 'desc' ? -1 : 1;
    
    return [...productsToSort].sort((a, b) => {
      // Handle createdAt sorting
      if (sortBy === 'createdAt') {
        return (new Date(a.createdAt) - new Date(b.createdAt)) * direction;
      }
      
      // Handle productname sorting (case insensitive)
      if (sortBy === 'productname') {
        return a.productname.localeCompare(b.productname) * direction;
      }
      
      // Handle quantity sorting
      if (sortBy === 'quantity') {
        return (a.quantity - b.quantity) * direction;
      }
      
      // Default: no sorting
      return 0;
    });
  };

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8889/api/product/view`, {
        withCredentials: true
      });
      
      if (response.data.success) {
        const sortedProducts = sortProducts(response.data.allproducts, sortOption);
        setProducts(sortedProducts);
        setFilteredProducts(sortedProducts);
      } else {
        setError(response.data.message || 'Failed to fetch product details');
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(err.response?.data?.message || 'Failed to fetch product details');
    } finally {
      setLoading(false);
    }
  };

  // Handle sort option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    // No need to refetch, we'll sort client-side
  };

  // Loading and error states
  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex gap-2">
          <Link to="/stock" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Stock Management
          </Link>
          <Link to="/product/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add New Product
          </Link>
        </div>
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
          
          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Category
            </label>
            <select
              id="category"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.categoryname}
                </option>
              ))}
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
              <option value="productname_asc">Name (A-Z)</option>
              <option value="productname_desc">Name (Z-A)</option>
              <option value="quantity_asc">Quantity (Low to High)</option>
              <option value="quantity_desc">Quantity (High to Low)</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredProducts.length} of {products.length} products
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{product.productname}</h2>
            <p className="text-gray-600 mb-2">Quantity: {product.quantity}</p>
            <p className="text-gray-600 mb-4">Category: {product.category?.categoryname || 'Uncategorized'}</p>
            <div className="flex gap-2 flex-wrap">
              <Link
                to={`/product/viewsingleitem/${product._id}`}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
              >
                View
              </Link>
              <Link
                to={`/product/update/${product._id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
              >
                Update
              </Link>
              <Link
                to={`/product/delete/${product._id}`}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Delete
              </Link>
              <Link
                to={`/stock/add/${product._id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
              >
                Add Stock
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No products found matching your criteria.</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('');
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

export default Products;