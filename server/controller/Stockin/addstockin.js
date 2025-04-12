const StockIn = require('../../model/Stockin/Stockin');
const Product = require('../../model/Products/Product');
const Supplier = require('../../model/suppliers/suppliers');

exports.addStock = async (req, res) => {
    const { productId } = req.params;
    const { quantity, supplier } = req.body;
    const receivedBy = req.session.Userid;
    const companyId = req.session.company;

    try {
        if (!companyId || !receivedBy) {
            return res.status(400).json({
                success: false,
                message: "Company ID and User ID are required"
            });
        }

        if (!quantity || !supplier) {
            return res.status(400).json({
                success: false,
                message: "Quantity and supplier are required"
            });
        }

        // Check if product exists and belongs to the company
        const product = await Product.findOne({ 
            _id: productId,
            company: companyId 
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Check if supplier exists and belongs to the company
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

        // Create new stock entry
        const newStock = new StockIn({
            product: productId,
            quantity: parseInt(quantity),
            status: "pending",
            receivedBy,
            supplier,
            company: companyId
        });

        await newStock.save();

        // Populate the response with product and supplier details
        const populatedStock = await StockIn.findById(newStock._id)

        return res.status(201).json({
            success: true,
            message: "Stock entry created successfully",
            stock: populatedStock
        });

    } catch (error) {
        console.error("Error creating stock entry:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating stock entry"
        });
    }
}; 