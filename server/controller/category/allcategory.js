// Importing category model
const Categorymodel = require("../../model/category/category");

// Controller for viewing all categories for a manager
exports.viewcategory = async (req, res) => {
    const managerid = req.session.Userid; // Get manager ID from session

    try {
        // Find categories for the given manager
        const mycategory = await Categorymodel.find({ manager: managerid });

        if (mycategory) {
            // If categories are found, return them
            return res.status(200).json({ 
                allcategories: mycategory, 
                success: true 
            });
        } else {
            // If no categories are found, return a message
            return res.status(404).json({ 
                message: "No categories found for this manager", 
                success: false 
            });
        }
    } catch (error) {
        // Handle any errors that occur
        console.error("Error fetching categories:", error);
        return res.status(500).json({ 
            message: "An error occurred while fetching categories", 
            success: false 
        });
    }
};