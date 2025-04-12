// Importing Product model
const ProductsModel = require("../../model/Products/Product");
const CategoryModel = require("../../model/category/category");

// Controller for viewing all categories for a manager
exports.viewProduct = async (req, res) => {
    try {
        const companyId = req.session.company;
        const { search, category, sortBy, sortOrder } = req.query;

        if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "Company ID is required"
            });
        }

        // Base query
        let query = { company: companyId };

        // Search functionality (by product name)
        if (search) {
            query.productname = { $regex: search, $options: 'i' };
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Sorting
        let sortOption = { createdAt: -1 }; // Default sort
        if (sortBy) {
            sortOption = {};
            sortOption[sortBy] = sortOrder === 'desc' ? -1 : 1;
        }

        const products = await ProductsModel.find(query)
            .populate({
                path: 'category',
                select: 'categoryname'
            })
            .sort(sortOption)
            .exec();

        // Get distinct categories for filter dropdown
        const categories = await ProductsModel.distinct('category', { company: companyId });

        res.status(200).json({
            success: true,
            allproducts: products,
            categories: categories
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};