// Importing category model
const Categorymodel = require("../../model/category/category");

// Controller for viewing all categories for a manager
exports.viewsinglecategory = async (req, res) => {
    const { categoryId } = req.params; // Get category ID from request parameters
    const companyId = req.session.company; // Get company ID from session
    try {
        if(!companyId){
            return res.status(400).json({
                success: false,
                message: "Company ID is required"
            });
        }
        // Find categories for the given company
        const mycategory = await Categorymodel.findOne({ company:companyId,_id: categoryId });

        if (mycategory) {
            // If categories are found, return them
            return res.status(200).json({ 
                viewcategory: mycategory, 
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