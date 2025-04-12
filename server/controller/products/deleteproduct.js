const Productmodel = require("../../model/Products/Product");

// Controller to soft delete a specific Product
exports.deleteProduct = async (req, res) => {
    const { productId } = req.params;
    const companyId = req.session.company;

    try {
        if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "Company ID is required"
            });
        }

        // Soft delete implementation
        const deletedProduct = await Productmodel.findOneAndUpdate(
            { 
                _id: productId, 
                company: companyId 
            },
            { 
                isDeleted: true,
            },
            { new: true } // Return the updated document
        );

        if (!deletedProduct) {
            return res.status(404).json({ 
                success: false,
                message: "Product not found or doesn't belong to your company" 
            });
        }

        return res.status(200).json({ 
            success: true,
            message: "Product moved to trash",
            product: deletedProduct
        });

    } catch (error) {
        console.error("Error deleting Product:", error);
        return res.status(500).json({ 
            success: false,
            message: "An error occurred while deleting the Product" 
        });
    }
};