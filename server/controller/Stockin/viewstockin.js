const StockIn = require('../../model/Stockin/Stockin');

exports.viewStock = async (req, res) => {
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

        const stock = await StockIn.find(query)
            .populate({
                path: 'product',
                select: 'productname'
            })
            .populate('supplier')
            .populate('receivedBy')
            .sort(sortOption);

        return res.status(200).json({
            success: true,
            stock: stock
        });

    } catch (error) {
        console.error("Error fetching stock entries:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching stock entries"
        });
    }
};