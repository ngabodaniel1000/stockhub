import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

function AdminNotification() {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    // Fetch notifications
    const fetchNotifications = async () => {
        try {
            const response = await axios.get('http://localhost:8889/api/account/viewpendingmanager', {
                withCredentials: true
            });
            
            const newCount = response.data.pendingManagers.length;
            
            // Show toast only on first load if there are pending managers
            if (isFirstLoad && newCount > 0) {
                toast.info(`You have ${newCount} pending manager request${newCount > 1 ? 's' : ''}`);
                setIsFirstLoad(false);
            }
            // After first load, only show toast if count increases
            else if (!isFirstLoad && newCount > unreadCount) {
                toast.info(`New manager request received!`);
            }
            
            setNotifications(response.data.pendingManagers);
            setUnreadCount(newCount);
            setLoading(false);

        } catch (error) {
            console.error('Error fetching notifications:', error);
            toast.error('Failed to fetch notifications');
        }
    };

    // Accept manager function
    const handleAcceptManager = async (managerId) => {
        try {
            await axios.post(
                `http://localhost:8889/api/account/acceptmanager/${managerId}`,
                {}, // empty body since we're not sending data
                {
                    withCredentials: true // correct place for withCredentials
                }
            );
            toast.success('Manager approved successfully!');
            fetchNotifications(); // Refresh notifications
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error approving manager');
            console.error('Error accepting manager:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container mx-auto p-4">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                limit={1}
                />
            
            {/* Notification Bell Icon with Badge */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Company Management</h2>
                <div className="relative">
                    <span className="text-2xl">🔔</span>
                    {unreadCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                            {unreadCount}
                        </span>
                    )}
                </div>
            </div>

            {/* Notifications List */}
            <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Pending Approvals</h3>
                {loading ? (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                ) : notifications.length === 0 ? (
                    <p className="text-gray-500 text-center">No pending approvals</p>
                ) : (
                    <div className="space-y-4">
                        {notifications.map((notification) => (
                            <div key={notification._id} 
                                className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50">
                                <div>
                                    <p className="font-medium">{notification.username}</p>
                                    <p className="text-gray-600">{notification.email}</p>
                                    <p className="text-sm text-gray-500">
                                        Requested: {new Date(notification.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleAcceptManager(notification._id)}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                                >
                                    Approve
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminNotification;
