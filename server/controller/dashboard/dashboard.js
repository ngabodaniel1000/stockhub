const ProductModel = require('../../model/Products/Product');
const CategoryModel = require('../../model/category/category');
const StockInModel = require('../../model/Stockin/Stockin');
const StockOutModel = require('../../model/stockout/stockout');
const CustomerModel = require('../../model/customer/customer');
const SupplierModel = require('../../model/suppliers/suppliers');
const mongoose = require('mongoose');


// Get dashboard overview data
exports.getDashboardOverview = async (req, res) => {
    try {
        const [
            totalProducts,
            totalCategories,
            totalCustomers,
            totalSuppliers,
            outOfStockProducts,
            recentStockIns,
            recentStockOuts
        ] = await Promise.all([
            ProductModel.countDocuments(),
            CategoryModel.countDocuments(),
            CustomerModel.countDocuments(),
            SupplierModel.countDocuments(),
            ProductModel.countDocuments({ quantity: { $lte: 0 } }),
            StockInModel.find().sort({ createdAt: -1 }).limit(5).populate({
                path: 'product',
                select: 'productname'
            }),
            StockOutModel.find().sort({ createdAt: -1 }).limit(5).populate({
                path: 'product',
                select: 'productname'
            })
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalProducts,
                totalCategories,
                totalCustomers,
                totalSuppliers,
                outOfStockProducts,
                recentStockIns,
                recentStockOuts
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get top selling products (only counts stockouts with reason="sale")
exports.getSalesData = async (req, res) => {
    const CompanyId = req.session.company
    try {
        const topProducts = await StockOutModel.aggregate([
            {
                $match: {
                    reason: "sale", // Only include sales transactions,,
                    // company: CompanyId // Filter by company ID
                }
            },
            {
                $group: {
                    _id: "$product",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            { $sort: { totalQuantity: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product"
                }
            },
            { $unwind: "$product" },
            {
                $project: {
                    productName: "$product.productname",
                    totalQuantity: 1,
                    _id: 0
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: topProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get inventory status
exports.getInventoryStatus = async (req, res) => {
    try {
        const products = await ProductModel.find()
        .populate('category')
        const inventoryStatus = products.map(product => ({
            name: product.name,
            quantity: product.quantity,
            category: product.category.name,
            status: product.quantity <= 0 ? 'Out of Stock' : product.quantity <= 10 ? 'Low Stock' : 'In Stock'
        }));

        res.status(200).json({
            success: true,
            data: inventoryStatus
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}; 