const StockinModel = require('../../model/Stockin/Stockin');
const Product = require('../../model/Products/Product');

exports.delete = async (req, res) => {
    const { stockInId } = req.params;
    const companyId = req.session.company;

    try {
        if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "Company ID is required"
            });
        }

        // Check if stockin exists and belongs to the company
        const stockin = await StockinModel.findOne({ _id: stockInId })
            // .populate('product');

        if (!stockin) {
            return res.status(404).json({
                success: false,
                message: "Stockin not found"
            });
        }

        // Delete the stockin
        await StockinModel.findByIdAndDelete(stockInId);

        return res.status(200).json({
            success: true,
            message: "Stockin deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting stockin:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the stockin"
        });
    }
};