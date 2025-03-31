// Importing category model
const Categorymodel = require("../../model/category/category");

// Controller to update a specific category
exports.updateCategory = async (req, res) => {
    const { categoryId } = req.params; // Get category ID from request parameters
    const { categoryname } = req.body; // Get updated category name from request body
    const companyId = req.session.company; // Get company ID from session
    try {
        if(!companyId){
            return res.status(400).json({
                success: false,
                message: "Company ID is required"
            });
        }
        // Find the category by ID
        const category = await Categorymodel.findOne({ _id: categoryId,company: companyId });

        // Check if the category exists
        if (!category) {
            return res.status(404).json({ 
                message: "Category not found", 
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