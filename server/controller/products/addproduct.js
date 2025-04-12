// importing mongoose
const mongoose = require("mongoose")
const CategoryModel = require('../../model/category/category')
const ProductsModel = require("../../model/Products/Product")

// exporting controller to add new product
exports.addProduct = async (req, res) => {
    try {
        const { productname, description, quantity, category, image } = req.body;
        const companyId = req.session.company;

        if (!companyId) {
            return res.status(400).json({ success: false, message: 'Company ID is required' });
        } 
        if(!productname || !description || !category) {
            return res.status(400).json({ success: false, message: 'Product name, description, and category are required' });
        }

        // Check if category exists and belongs to the company
        if (category) {
            const categoryExists = await CategoryModel.findOne({ _id: category, company: companyId });
            if (!categoryExists) {
                return res.status(404).json({ success: false, message: 'Category not found' });
            }
        }

        const newProduct = new ProductsModel({
            productname,
            description,
            quantity: quantity || 0,
            category,
            image,
            company: companyId
        });

        await newProduct.save();

        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
