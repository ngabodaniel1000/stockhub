const StockOut = require('../../model/stockout/stockout');
const Product = require('../../model/Products/Product');
const Customer = require('../../model/customer/customer'); // Assuming you have a Customer model

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