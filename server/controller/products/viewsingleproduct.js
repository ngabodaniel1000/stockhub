// Importing Product model
const Productmodel = require("../../model/Products/Product");

// Controller for viewing all categories for a manager
exports.viewSingleProduct = async (req, res) => {
    const companyId = req.session.company; // Get manager ID from session
    const { ProductId } = req.params; // Get Product ID from request parameters

    try {
        if(!companyId){
            return res.status(400).json({
                success: false,
                message: "Company ID is required"
            });
        }
        // Find categories for the given manager
        const myProduct = await Productmodel.find({ company: companyId,_id: ProductId });

        if (myProduct.length > 0) {
            // If categories are found, return them
            return res.status(200).json({ 
                product: myProduct, 
                success: true 
            });
        } else {
            // If no categories are found, return a message
            return res.status(404).json({ 
                message: "No product found for this manager", 
                success: false 
            });
        }
    } catch (error) {
        // Handle any errors that occur
        console.error("Error fetching products:", error);
        return res.status(500).json({ 
            message: "An error occurred while fetching products", 
            success: false 
        });
    }
};