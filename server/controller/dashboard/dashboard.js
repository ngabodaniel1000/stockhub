const ProductModel = require('../../model/Products/Product');
const CategoryModel = require('../../model/category/category');
const StockInModel = require('../../model/Stockin/Stockin');
const StockOutModel = require('../../model/stockout/stockout');
const CustomerModel = require('../../model/customer/customer');
const SupplierModel = require('../../model/suppliers/suppliers');
const mongoose = require('mongoose');


// Get dashboard overview data
exports.getDashboardOverview = async (req, res) => {
    const companyid = req.session.company
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
            ProductModel.countDocuments({ quantity: { $eq:0 } }),
            StockInModel.find({company:companyid}).sort({ createdAt: -1 }).limit(5).populate({
                path: 'product',
                select: 'productname'
            }),
            StockOutModel.find({company:companyid}).sort({ createdAt: -1 }).limit(5).populate({
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
    const CompanyId = req.session.company;
    
    // Validate company ID
    if (!CompanyId || !mongoose.Types.ObjectId.isValid(CompanyId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid company ID"
        });
    }

    try {
       

        const aggregationPipeline = [
            {
                $match: {
                    reason: "sale",
                    company: new mongoose.Types.ObjectId(CompanyId),
                    isDeleted: { $ne: true } // Exclude deleted records
                }
            },
            {
                $group: {
                    _id: "$product",
                    totalQuantity: { $sum: "$quantity" },
                    totalSales: { $sum: { $multiply: ["$quantity", "$unitPrice"] } } // Add if you track prices
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
                    productId: "$product._id",
                    productName: "$product.productname",
                    productImage: "$product.image", // Add if available
                    totalQuantity: 1,
                    totalSales: 1,
                    _id: 0
                }
            }
        ];

        const topProducts = await StockOutModel.aggregate(aggregationPipeline);

        res.status(200).json({
            success: true,
            data: topProducts
        });
    } catch (error) {
        console.error("Error in getSalesData:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch sales data",
            error: error.message
        });
    }
};

// Get inventory status
exports.getInventoryStatus = async (req, res) => {
    const companyId = req.session.company
    try {
        const products = await ProductModel.find({company:companyId})
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