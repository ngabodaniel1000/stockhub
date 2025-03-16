// Importing Product model
const Productmodel = require("../../model/Products/Product");

// Controller to delete a specific Product
exports.deleteProduct = async (req, res) => {
    const { ProductId } = req.params; // Get Product ID from request parameters
    const managerid = req.session.Userid; // Get manager ID from session

    try {
        // Find the Product by ID and ensure it belongs to the logged-in manager
        const Product = await Productmodel.findOne({ _id: ProductId, manager: managerid });

        if (!Product) {
            // If the Product doesn't exist or doesn't belong to the manager
            return res.status(404).json({ 
                message: "Product not found", 
                success: false 
            });
        }

        // Delete the Product
        await Productmodel.deleteOne({ _id: ProductId });

        // Return success response
        return res.status(200).json({ 
            message: "Product deleted successfully", 
            success: true 
        });
    } catch (error) {
        // Handle any errors that occur
        console.error("Error deleting Product:", error);
        return res.status(500).json({ 
            message: "An error occurred while deleting the Product", 
            success: false 
        });
    }
};