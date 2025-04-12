const StockOut = require('../../model/stockout/stockout');
const Product = require('../../model/Products/Product');

exports.updateStockOutStatus = async (req, res) => {
    const { stockOutId } = req.params;
    const { status } = req.body;
    const companyId = req.session.company;

    try {
        if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "Company ID is required"
            });
        }

        if (!status || !["pending", "processed", "cancelled"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Valid status is required"
            });
        }

        // Find the stock out entry
        const stockOutEntry = await StockOut.findOne({
            _id: stockOutId,
            company: companyId
        }).populate('product');

        if (!stockOutEntry) {
            return res.status(404).json({
                success: false,
                message: "Stock out entry not found"
            });
        }

        // If status is being changed to processed
        if (status === "processed" && stockOutEntry.status === "pending") {
            // Verify product exists and belongs to company
            const product = await Product.findOne({
                _id: stockOutEntry.product._id,
                company: companyId
            });

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }

            // Check if sufficient stock exists
            if (product.quantity < stockOutEntry.quantity) {
                return res.status(400).json({
                    success: false,
                    message: "Insufficient stock available"
                });
            }

            // Update product quantity
            product.quantity -= stockOutEntry.quantity;
            await product.save();
        }

        // If status is being changed back to pending from processed
        if (status === "pending" && stockOutEntry.status === "processed") {
            // Verify product exists and belongs to company
            const product = await Product.findOne({
                _id: stockOutEntry.product._id,
                company: companyId
            });

            if (product) {
                // Restore the deducted quantity
                product.quantity += stockOutEntry.quantity;
                await product.save();
            }
        }

        // Update stock out entry status
        stockOutEntry.status = status;
        await stockOutEntry.save();

        // Get updated stock out entry with populated fields
        const updatedStockOut = await StockOut.findById(stockOutId)
            .populate('product')
            .populate('customer')
            .populate('processedBy');

        return res.status(200).json({
            success: true,
            message: "Stock out status updated successfully",
            stockOut: updatedStockOut
        });

    } catch (error) {
        console.error("Error updating stock out status:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating stock out status"
        });
    }
};