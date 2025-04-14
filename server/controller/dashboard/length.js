const CategoryModel = require("../../model/category/category");
const ProductsModel = require("../../model/Products/Product");
const StockInModel = require("../../model/Stockin/Stockin")

exports.lengthdetails = async(req,res)=>{
    try {
        const companyId = req.session.company;
        // find all products
        const products = await ProductsModel.find({company:companyId})
        // Find categories for the given company
        const mycategory = await CategoryModel.find({ company: companyId });
        const outofstock = await ProductsModel.find({quantity:{$lt:5}})
        const orders = await StockInModel.find({company:companyId,status:"pending"})
        res.status(200).json({
            success: true,
            productlength: products,
            categorylength:mycategory,
            outofstocklength:outofstock,
            orderslength:orders
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};