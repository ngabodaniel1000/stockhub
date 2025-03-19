// Import required models
const Manager = require('../../model/Accounts/Managersmodel');
const Company = require('../../model/company/company');

// Function to accept/activate manager
exports.acceptManager = async (req, res) => {
    const { managerId } = req.params;

    try {
        // Check if managerId is provided
        if (!managerId) {
            return res.status(400).json({
                success: false,
                message: "Manager ID is required"
            });
        }

        // Check if user is logged in as admin
        if (!req.session.Userid || req.session.role !== 'Admin') {
            return res.status(403).json({
                success: false,
                message: "Only admins can activate manager accounts"
            });
        }

        // Find the admin's company
        const adminCompany = await Company.findOne({
            managers: { 
                $elemMatch: { 
                    id: req.session.Userid 
                }
            }
        });

        if (!adminCompany) {
            return res.status(404).json({
                success: false,
                message: "Admin's company not found"
            });
        }

        // Find the manager
        const manager = await Manager.findById(managerId);
        if (!manager) {
            return res.status(404).json({
                success: false,
                message: "Manager not found"
            });
        }

        // Check if the manager belongs to admin's company
        if (manager.company.toString() !== adminCompany._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You don't have permission to activate this manager"
            });
        }
       // check if manager is already active
       if (manager.active) {
            return res.status(400).json({
                success: false,
                message: "Manager account is already active"
       })}
        // Update manager's active status
        manager.active = true;
        await manager.save();

        return res.status(200).json({
            success: true,
            message: "Manager account activated successfully",
            manager: {
                id: manager._id,
                username: manager.username,
                email: manager.email,
                company: manager.company,
                active: manager.active
            }
        });

    } catch (error) {
        console.error("Error accepting manager:", error);
        return res.status(500).json({
            success: false,
            message: "Error activating manager account",
            error: error.message
        });
    }
};

// Function to get pending managers for admin's company
exports.getPendingManagers = async (req, res) => {
    try {
        // Check if user is logged in as admin
        if (!req.session.Userid || req.session.role !== 'Admin') {
            return res.status(403).json({
                success: false,
                message: "Only new admins can view pending managers"
            });
        }

        // Find the admin's company
        const adminCompany = await Company.findOne({
            managers: { 
                $elemMatch: { 
                    id: req.session.Userid 
                }
            }
        });

        if (!adminCompany) {
            return res.status(404).json({
                success: false,
                message: "Admin's company not found"
            });
        }

        // Find all inactive managers for the admin's company
        const pendingManagers = await Manager.find({
            company: adminCompany._id,
            active: false,
            role: 'manager'
        }).select('username email createdAt');

        return res.status(200).json({
            success: true,
            company: adminCompany.companyname,
            pendingManagers
        });

    } catch (error) {
        console.error("Error fetching pending managers:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching pending managers",
            error: error.message
        });
    }
};

// Add new function to get notifications
exports.getManagerNotifications = async (req, res) => {
    try {
        // Check if user is logged in as admin
        if (!req.session.Userid || req.session.role !== 'Admin') {
            return res.status(403).json({
                success: false,
                message: "Only admins can view notifications"
            });
        }

        // Find the admin's company
        const adminCompany = await Company.findOne({
            managers: { 
                $elemMatch: { 
                    id: req.session.Userid 
                }
            }
        });

        if (!adminCompany) {
            return res.status(404).json({
                success: false,
                message: "Admin's company not found"
            });
        }

        // Get unread notifications (pending managers)
        const notifications = await Manager.find({
            company: adminCompany._id,
            active: false,
            role: 'manager'
        })
        .select('username email createdAt')
        .sort({ createdAt: -1 }); // Most recent first

        return res.status(200).json({
            success: true,
            notifications,
            unreadCount: notifications.length
        });

    } catch (error) {
        console.error("Error fetching notifications:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching notifications"
        });
    }
};
