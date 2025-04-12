const mongoose = require("mongoose");
const StockOut = require('../../model/stockout/stockout');
const Product = require('../../model/Products/Product');
const Customer = require('../../model/customer/customer');

exports.addStockOut = async (req, res) => {
    const { productId } = req.params;
    const { quantity, reason, customer } = req.body;
    const processedBy = req.session.Userid;
    const companyId = req.session.company;

    try {
        // Validate required session data
        if (!companyId || !processedBy) {
            return res.status(400).json({
                success: false,
                message: "Company ID and User ID are required"
            });
        }

        // Validate required inputs
        if (!quantity || !reason) {
            return res.status(400).json({
                success: false,
                message: "Quantity and reason are required"
            });
        }

        // If reason is "sale", customer is required and must be valid
        if (reason === "sale") {
            if (!customer || !mongoose.Types.ObjectId.isValid(customer)) {
                return res.status(400).json({
                    success: false,
                    message: "Valid customer ID is required for a sale"
                });
            }

            const customerExists = await Customer.findOne({ _id: customer, company: companyId });
            if (!customerExists) {
                return res.status(404).json({
                    success: false,
                    message: "Customer not found"
                });
            }
        }

        // Check if product exists
        const product = await Product.findOne({ _id: productId, company: companyId });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Check stock availability
        if (product.quantity < quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock available"
            });
        }

        // Create StockOut record
        const newStockOut = new StockOut({
            product: productId,
            quantity: parseInt(quantity),
            status: "pending",
            processedBy,
            customer: reason === "sale" ? customer : null, // Only include customer if it's a sale
            reason,
            company: companyId
        });

        await newStockOut.save();

        // Populate for response
        const populatedStockOut = await StockOut.findById(newStockOut._id)
            .populate('product')
            .populate('customer')
            .populate('processedBy');

        return res.status(201).json({
            success: true,
            message: "Stock out entry created successfully",
            stockOut: populatedStockOut
        });

    } catch (error) {
        console.error("Error creating stock out entry:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating stock out entry"
        });
    }
};
