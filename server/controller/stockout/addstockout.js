const StockOut = require('../../model/stockout/stockout');
const Product = require('../../model/Products/Product');
const Customer = require('../../model/customers/customers'); // Assuming you have a Customer model

exports.addStockOut = async (req, res) => {
    const { productId } = req.params;
    const { quantity, customer, reason } = req.body;
    const processedBy = req.session.Userid;
    const companyId = req.session.company;

    try {
        // Validate required fields
        if (!companyId || !processedBy) {
            return res.status(400).json({
                success: false,
                message: "Company ID and User ID are required"
            });
        }

        if (!quantity || !customer || !reason) {
            return res.status(400).json({
                success: false,
                message: "Quantity, customer, and reason are required"
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

        // Check if customer exists (if applicable)
        const customerExists = await Customer.findOne({ 
            _id: customer,
            company: companyId 
        });

        if (!customerExists) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        // Check if sufficient stock exists
        if (product.quantity < quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock available"
            });
        }

        // Create new stock out entry
        const newStockOut = new StockOut({
            product: productId,
            quantity: parseInt(quantity),
            status: "processed",
            processedBy,
            customer,
            reason,
            company: companyId
        });

        await newStockOut.save();

        // Update product quantity
        product.quantity -= parseInt(quantity);
        await product.save();

        // Populate the response with product and customer details
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

exports.viewStockOut = async (req, res) => {
    const companyId = req.session.company;
    const { search, status, sortBy, sortOrder } = req.query;

    try {
        if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "Company ID is required"
            });
        }

        // Base query
        let query = { company: companyId };

        // Search by product name
        if (search) {
            query['product.productname'] = { $regex: search, $options: 'i' };
        }

        // Filter by status
        if (status) {
            query.status = status;
        }

        // Sorting
        let sortOption = { createdAt: -1 }; // Default sort
        if (sortBy) {
            sortOption = {};
            sortOption[sortBy] = sortOrder === 'desc' ? -1 : 1;
        }

        const stockOut = await StockOut.find(query)
            .populate({
                path: 'product',
                select: 'productname'
            })
            .populate('customer')
            .populate('processedBy')
            .sort(sortOption);

        return res.status(200).json({
            success: true,
            stockOut: stockOut
        });

    } catch (error) {
        console.error("Error fetching stock out entries:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching stock out entries"
        });
    }
};