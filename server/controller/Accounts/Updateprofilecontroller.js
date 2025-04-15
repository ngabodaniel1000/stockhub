const Manager = require("../../model/Accounts/Managersmodel");
const bcrypt = require('bcrypt');

exports.updateprofile = async (req, res) => {
    try {
        const managerid = req.params.managerid;
        const { email, password, username} = req.body;

        // Validate required fields
        if (!email || !username) {
            return res.status(400).json({ 
                success: false,
                message: "Email and username are required fields" 
            });
        }

        // Prepare update data
        const updateData = { 
            email, 
            username,
        };

        // Only hash and update password if it's provided
        if (password) {
            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: "Password must be at least 6 characters long"
                });
            }
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        // Find and update the manager
        const updatedManager = await Manager.findByIdAndUpdate(
            managerid,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedManager) {
            return res.status(404).json({
                success: false,
                message: "Manager not found"
            });
        }

        // Return success response (excluding sensitive data)
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: {
                _id: updatedManager._id,
                email: updatedManager.email,
                username: updatedManager.username,
            }
        });

    } catch (error) {
        console.error("Error updating profile:", error);
        
        // Handle duplicate key error (unique email)
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }

        return res.status(500).json({
            success: false,
            message: "Server error while updating profile"
        });
    }
};