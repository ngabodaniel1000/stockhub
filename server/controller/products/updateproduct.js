// Importing Product model
const Productmodel = require("../../model/Products/Product");
const CategoryModel = require('../../model/category/category');

// Controller to update a specific Product
exports.updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { productname, description, quantity, category, image } = req.body;
        const companyId = req.session.company;

        if (!companyId) {
            return res.status(400).json({ success: false, message: 'Company ID is required' });
        }

        // Check if product exists and belongs to the company
        const product = await Productmodel.findOne({ _id: productId, company: companyId });
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not foundjhdjkd' });
        }

        // Check if category exists and belongs to the company
        if (category) {
            const categoryExists = await CategoryModel.findOne({ _id: category, company: companyId });
            if (!categoryExists) {
                return res.status(404).json({ success: false, message: 'Category not found' });
            }
        }

        // Update product fields
        const updateData = {
            productname: productname || product.productname,
            description: description || product.description,
            quantity: quantity !== undefined ? quantity : product.quantity,
            category: category || product.category,
            image: image || product.image
        };

        const updatedProduct = await Productmodel.findByIdAndUpdate(
            productId,
            updateData,
            { new: true }
        );

        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
