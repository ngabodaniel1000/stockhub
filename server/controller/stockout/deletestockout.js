const Stock = require('../../model/stockout/stockout');
const Product = require('../../model/Products/Product');
exports.delete = async (req, res) => {
    const { stockOutId } = req.params;
    const companyId = req.session.company;

    try {
        if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "Company ID is required"
            });
        }

        // Soft delete implementation (recommended)
        const deletedStock = await Stock.findOneAndUpdate(
            { _id: stockOutId, company: companyId },
            { 
                isDeleted: true,
                deletedAt: new Date() 
            },
            { new: true }
        );

        if (!deletedStock) {
            return res.status(404).json({
                success: false,
                message: "Stock entry not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Stock entry moved to trash",
            stock: deletedStock
        });

    } catch (error) {
        console.error("Error deleting stock entry:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting stock entry"
        });
    }
};