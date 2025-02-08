// Importing category model
const Categorymodel = require("../../model/category/category");

// Controller to update a specific category
exports.updateCategory = async (req, res) => {
    const { categoryId } = req.params; // Get category ID from request parameters
    const { categoryname } = req.body; // Get updated category name from request body
    const managerid = req.session.Userid; // Get manager ID from session

    try {
        // Find the category by ID
        const category = await Categorymodel.findOne({ _id: categoryId });

        // Check if the category exists
        if (!category) {
            return res.status(404).json({ 
                message: "Category not found", 
                success: false 
            });
        }

        // Check if the category belongs to the logged-in manager
        if (category.manager.toString() !== managerid) {
            return res.status(403).json({ 
                message: "You do not have permission to update this category", 
                success: false 
            });
        }

        // Update the category
        const updatedCategory = await Categorymodel.findByIdAndUpdate(
            categoryId, 
            { categoryname }, // Update the category name
            { new: true } // Return the updated document
        );

        // Return success response with the updated category
        return res.status(200).json({ 
            message: "Category updated successfully", 
            success: true, 
            updatedCategory 
        });
    } catch (error) {
        // Handle any errors that occur
        console.error("Error updating category:", error);
        return res.status(500).json({ 
            message: "An error occurred while updating the category", 
            success: false 
        });
    }
};