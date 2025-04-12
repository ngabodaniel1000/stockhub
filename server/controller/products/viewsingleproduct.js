// Importing Product model
const ProductsModel = require("../../model/Products/Product");
// const CategoryModel = require("../../model/category/category");

// Controller for viewing all categories for a manager
exports.viewSingleProduct = async (req, res) => {
    try {
        const { ProductId } = req.params;
        const companyId = req.session.company;

        if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "Company ID is required"
            });
        }

        if (!ProductId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        const product = await ProductsModel.findOne({ _id: ProductId, company: companyId })
            .populate({
                path: 'category',
                select: 'categoryname'
            })
            .exec();

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            product: product
        });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


