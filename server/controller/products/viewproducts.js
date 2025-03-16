// Importing Product model
const Productmodel = require("../../model/Products/Product");

// Controller for viewing all categories for a manager
exports.viewProduct = async (req, res) => {
    const managerid = req.session.Userid; // Get manager ID from session

    try {
        // Find categories for the given manager
        const myProduct = await Productmodel.find({ manager: managerid });

        if (myProduct) {
            // If categories are found, return them
            return res.status(200).json({ 
                allproducts: myProduct, 
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