import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faBox,
    faUsers,
    faExclamationTriangle,
    faChartLine,
    faArrowUp,
    faArrowDown,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement
);

// Add icons to library
library.add(
    faBox,
    faUsers,
    faExclamationTriangle,
    faChartLine,
    faArrowUp,
    faArrowDown,
    faSignOutAlt
);

const Dashboard = ({ darkmode }) => {
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [topProducts, setTopProducts] = useState([]);
    const [inventoryData, setInventoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [overviewRes, salesRes, inventoryRes] = await Promise.all([
                axios.get('http://localhost:8889/api/dashboard/overview', { withCredentials: true }),
                axios.get('http://localhost:8889/api/dashboard/sales', { withCredentials: true }),
                axios.get('http://localhost:8889/api/dashboard/inventory', { withCredentials: true })
            ]);

            if (overviewRes.data.success && salesRes.data.success && inventoryRes.data.success) {
                setDashboardData(overviewRes.data.data);
                setTopProducts(salesRes.data.data);
                setInventoryData(inventoryRes.data.data);
            } else {
                setError('Failed to fetch dashboard data');
            }
        } catch (err) {
            setError('Error fetching dashboard data');
            console.error('Dashboard error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className={`flex items-center justify-center min-h-screen ${darkmode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${darkmode ? 'border-blue-400' : 'border-blue-500'}`}></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`flex items-center justify-center min-h-screen ${darkmode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <div className={darkmode ? 'text-red-400' : 'text-red-500'}>{error}</div>
            </div>
        );
    }

    const stats = [
        {
            name: 'Total Products',
            value: dashboardData?.totalProducts || 0,
            icon: faBox,
            change: '+4.75%',
            changeType: 'positive'
        },
        {
            name: 'Total Customers',
            value: dashboardData?.totalCustomers || 0,
            icon: faUsers,
            change: '+54.02%',
            changeType: 'positive'
        },
        {
            name: 'Out of Stock',
            value: dashboardData?.outOfStockProducts || 0,
            icon: faExclamationTriangle,
            change: '-1.39%',
            changeType: 'negative'
        },
        {
            name: 'Total Sales',
            value: topProducts.reduce((sum, product) => sum + product.totalQuantity, 0),
            icon: faChartLine,
            change: '+10.18%',
            changeType: 'positive'
        }
    ];

    // Chart data for top products
    const topProductsChartData = {
        labels: topProducts.map(product => product.productName),
        datasets: [
            {
                label: 'Quantity Sold',
                data: topProducts.map(product => product.totalQuantity),
                backgroundColor: darkmode ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.5)',
                borderColor: darkmode ? 'rgb(59, 130, 246)' : 'rgb(59, 130, 246)',
                borderWidth: 1
            }
        ]
    };

    const barChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: darkmode ? '#e5e7eb' : '#374151'
                }
            },
            title: {
                display: true,
                text: 'Top 5 Selling Products',
                color: darkmode ? '#e5e7eb' : '#374151'
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `Sold: ${context.raw} units`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: darkmode ? '#e5e7eb' : '#374151',
                    callback: function(value) {
                        return value + ' units';
                    }
                },
                grid: {
                    color: darkmode ? 'rgba(229, 231, 235, 0.1)' : 'rgba(209, 213, 219, 0.5)'
                }
            },
            x: {
                ticks: {
                    color: darkmode ? '#e5e7eb' : '#374151'
                },
                grid: {
                    color: darkmode ? 'rgba(229, 231, 235, 0.1)' : 'rgba(209, 213, 219, 0.5)'
                }
            }
        }
    };

    // Inventory status data for doughnut chart
    const inventoryStatusData = {
        labels: ['In Stock', 'Low Stock', 'Out of Stock'],
        datasets: [
            {
                data: [
                    inventoryData.filter(item => item.status === 'In Stock').length,
                    inventoryData.filter(item => item.status === 'Low Stock').length,
                    inventoryData.filter(item => item.status === 'Out of Stock').length
                ],
                backgroundColor: [
                    darkmode ? 'rgba(74, 222, 128, 0.8)' : 'rgba(34, 197, 94, 0.8)',
                    darkmode ? 'rgba(250, 204, 21, 0.8)' : 'rgba(234, 179, 8, 0.8)',
                    darkmode ? 'rgba(248, 113, 113, 0.8)' : 'rgba(239, 68, 68, 0.8)'
                ],
                borderWidth: 1
            }
        ]
    };

    const doughnutOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: darkmode ? '#e5e7eb' : '#374151'
                }
            },
            title: {
                display: true,
                text: 'Inventory Status',
                color: darkmode ? '#e5e7eb' : '#374151'
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.label}: ${context.raw} items`;
                    }
                }
            }
        }
    };

    return (
        <div className={`min-h-screen ${darkmode ? 'bg-gray-900' : 'bg-gray-100'} p-6`}>
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className={`text-3xl font-bold ${darkmode ? 'text-gray-100' : 'text-gray-900'}`}>Stock Dashboard</h1>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    {stats.map((stat) => (
                        <div
                            key={stat.name}
                            className={`relative overflow-hidden rounded-lg ${darkmode ? 'bg-gray-800' : 'bg-white'} px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6`}
                        >
                            <dt>
                                <div className={`absolute rounded-md ${darkmode ? 'bg-blue-600' : 'bg-blue-500'} p-3`}>
                                    <FontAwesomeIcon icon={stat.icon} className="h-6 w-6 text-white" />
                                </div>
                                <p className={`ml-16 truncate text-sm font-medium ${darkmode ? 'text-gray-300' : 'text-gray-500'}`}>{stat.name}</p>
                            </dt>
                            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                                <p className={`text-2xl font-semibold ${darkmode ? 'text-gray-100' : 'text-gray-900'}`}>{stat.value}</p>
                                <p
                                    className={`ml-2 flex items-baseline text-sm font-semibold ${
                                        stat.changeType === 'positive' ? 
                                        (darkmode ? 'text-green-400' : 'text-green-600') : 
                                        (darkmode ? 'text-red-400' : 'text-red-600')
                                    }`}
                                >
                                    <FontAwesomeIcon
                                        icon={stat.changeType === 'positive' ? faArrowUp : faArrowDown}
                                        className="h-5 w-5 flex-shrink-0 self-center"
                                    />
                                    <span className="sr-only">
                                        {stat.changeType === 'positive' ? 'Increased' : 'Decreased'} by
                                    </span>
                                    {stat.change}
                                </p>
                            </dd>
                        </div>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 mb-8">
                   {/* Top Products Chart */}
<div className={`p-6 rounded-lg shadow ${darkmode ? 'bg-gray-800' : 'bg-white'}`}>
    <Bar 
        data={topProductsChartData} 
        options={barChartOptions} 
        height={200} // Set height in pixels
        width={200} // Set width in pixels
    />
</div>


                    {/* Inventory Status Chart */}
                    <div className={`p-6 rounded-lg shadow ${darkmode ? 'bg-gray-800' : 'bg-white'}`}>
                        <Doughnut data={inventoryStatusData} options={doughnutOptions} />
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {/* Recent Stock Ins */}
                    <div className={`p-6 rounded-lg shadow ${darkmode ? 'bg-gray-800' : 'bg-white'}`}>
                        <h2 className={`text-lg font-medium mb-4 ${darkmode ? 'text-gray-100' : 'text-gray-900'}`}>Recent Stock Ins</h2>
                        <div className="space-y-4">
                            {dashboardData?.recentStockIns.map((stockIn) => (
                                <div
                                    key={stockIn._id}
                                    className={`flex items-center justify-between p-4 rounded-lg ${darkmode ? 'bg-gray-700' : 'bg-gray-50'}`}
                                >
                                    <div>
                                        <p className={`text-sm font-medium ${darkmode ? 'text-gray-100' : 'text-gray-900'}`}>
                                            {stockIn.product.productname}
                                        </p>
                                        <p className={`text-sm ${darkmode ? 'text-gray-300' : 'text-gray-500'}`}>
                                            Quantity: {stockIn.quantity}
                                        </p>
                                    </div>
                                    <span className={`text-sm ${darkmode ? 'text-gray-300' : 'text-gray-500'}`}>
                                        {new Date(stockIn.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Stock Outs */}
                    <div className={`p-6 rounded-lg shadow ${darkmode ? 'bg-gray-800' : 'bg-white'}`}>
                        <h2 className={`text-lg font-medium mb-4 ${darkmode ? 'text-gray-100' : 'text-gray-900'}`}>Recent Stock Outs</h2>
                        <div className="space-y-4">
                            {dashboardData?.recentStockOuts.map((stockOut) => (
                                <div
                                    key={stockOut._id}
                                    className={`flex items-center justify-between p-4 rounded-lg ${darkmode ? 'bg-gray-700' : 'bg-gray-50'}`}
                                >
                                    <div>
                                        <p className={`text-sm font-medium ${darkmode ? 'text-gray-100' : 'text-gray-900'}`}>
                                            {stockOut.product.productname}
                                        </p>
                                        <p className={`text-sm ${darkmode ? 'text-gray-300' : 'text-gray-500'}`}>
                                            Quantity: {stockOut.quantity}
                                        </p>
                                    </div>
                                    <span className={`text-sm ${darkmode ? 'text-gray-300' : 'text-gray-500'}`}>
                                        {new Date(stockOut.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;