// Importing category model
const Categorymodel = require("../../model/category/category");

// Controller to delete a specific category
exports.deleteCategory = async (req, res) => {
    const categoryId = req.body.categoryId; // Get category ID from request parameters
    const managerid = req.session.Userid; // Get manager ID from session
    const {companyId} = req.params

    try {
        // Find the category by ID and ensure it belongs to the logged-in manager
        const category = await Categorymodel.findOne({ _id: categoryId, company: companyId });

        if (!category) {
            // If the category doesn't exist or doesn't belong to the manager
            return res.status(404).json({ 
                message: "Category not found", 
                success: false 
            });
        }

        // Delete the category
        await Categorymodel.deleteOne({ _id: categoryId });

        // Return success response
        return res.status(200).json({ 
            message: "Category deleted successfully", 
            success: true 
        });
    } catch (error) {
        // Handle any errors that occur
        console.error("Error deleting category:", error);
        return res.status(500).json({ 
            message: "An error occurred while deleting the category", 
            success: false 
        });
    }
};