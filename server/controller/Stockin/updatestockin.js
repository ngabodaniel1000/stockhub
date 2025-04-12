const Purchase = require('../../model/Stockin/Stockin');
const Product = require('../../model/Products/Product');
const Supplier = require('../../model/suppliers/suppliers');

exports.updatePurchase = async (req, res) => {
    const { purchaseId } = req.params;
    const { quantity, status, supplier } = req.body;
    const companyId = req.session.company;

    try {
        if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "Company ID is required"
            });
        }

        // Check if purchase exists and belongs to the company
        const purchase = await Purchase.findOne({ _id: purchaseId })
            .populate('product');

        if (!purchase || purchase.product.company.toString() !== companyId) {
            return res.status(404).json({
                success: false,
                message: "Purchase not found"
            });
        }

        // Check if supplier exists and belongs to the company
        if (supplier) {
            const supplierExists = await Supplier.findOne({ 
                _id: supplier,
                company: companyId 
            });

            if (!supplierExists) {
                return res.status(404).json({
                    success: false,
                    message: "Supplier not found"
                });
            }
        }

        // Update purchase
        const updatedPurchase = await Purchase.findByIdAndUpdate(
            purchaseId,
            {
                quantity: quantity || purchase.quantity,
                status: status || purchase.status,
                supplier: supplier || purchase.supplier
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Purchase updated successfully",
            purchase: updatedPurchase
        });

    } catch (error) {
        console.error("Error updating purchase:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the purchase"
        });
    }
};

exports.updateStockStatus = async (req, res) => {
    const { stockId } = req.params;
    const { status } = req.body;
    const companyId = req.session.company;

    try {
        if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "Company ID is required"
            });
        }

        if (!status || !["pending", "received","cancelled"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Valid status is required"
            });
        }

        // Find the stock entry
        const stockEntry = await Purchase.findOne({
            _id: stockId,
            company: companyId
        }).populate('product');

        if (!stockEntry) {
            return res.status(404).json({
                success: false,
                message: "Stock entry not found"
            });
        }

        // If status is being changed to received
        if (status === "received" && stockEntry.status === "pending") {
            // Update product quantity
            const product = await Product.findById(stockEntry.product._id);
            if (product) {
                product.quantity = (product.quantity || 0) + parseInt(stockEntry.quantity);
                await product.save();
            }
        }

        // Update stock entry status
        stockEntry.status = status;
        await stockEntry.save();

        // Get updated stock entry with populated fields
        const updatedStock = await Purchase.findById(stockId)
            .populate('product')
            .populate('supplier')
            .populate('receivedBy');

        return res.status(200).json({
            success: true,
            message: "Stock status updated successfully",
            stock: updatedStock
        });

    } catch (error) {
        console.error("Error updating stock status:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating stock status"
        });
    }
}; 