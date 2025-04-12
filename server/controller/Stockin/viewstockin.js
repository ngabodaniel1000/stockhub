// const Purchase = require('../../model/Stockin/Stockin');
// const Product = require('../../model/Products/Product');
// const Supplier = require('../../model/suppliers/suppliers'); 

// exports.viewPurchases = async (req, res) => {
//     const companyId = req.session.company;

//     try {
//         if (!companyId) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Company ID is required"
//             });
//         }

//         const purchases = await Purchase.aggregate([
//             {
//                 $lookup: {
//                     from: 'products',
//                     localField: 'product',
//                     foreignField: '_id',
//                     as: 'productDetails'
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'suppliers',
//                     localField: 'supplier',
//                     foreignField: '_id',
//                     as: 'supplierDetails'
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'accounts',
//                     localField: 'receivedBy',
//                     foreignField: '_id',
//                     as: 'receivedByDetails'
//                 }
//             },
//             {
//                 $match: {
//                     'productDetails.company': companyId
//                 }
//             },
//             {
//                 $project: {
//                     _id: 1,
//                     quantity: 1,
//                     status: 1,
//                     createdAt: 1,
//                     updatedAt: 1,
//                     product: {
//                         $arrayElemAt: ['$productDetails', 0]
//                     },
//                     supplier: {
//                         $arrayElemAt: ['$supplierDetails', 0]
//                     },
//                     receivedBy: {
//                         $arrayElemAt: ['$receivedByDetails', 0]
//                     }
//                 }
//             },
//             {
//                 $sort: {
//                     createdAt: -1
//                 }
//             }
//         ]);

//         return res.status(200).json({
//             success: true,
//             purchases: purchases
//         });

//     } catch (error) {
//         console.error("Error fetching purchases:", error);
//         return res.status(500).json({
//             success: false,
//             message: "An error occurred while fetching stockin data"
//         });
//     }
// };

const StockIn = require('../../model/Stockin/Stockin');

exports.viewStock = async (req, res) => {
    const companyId = req.session.company;

    try {
        if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "Company ID is required"
            });
        }

        const stock = await StockIn.find({ company: companyId })
        .populate({
            path: 'product',
            select: 'productname'
        })
            .populate('supplier')
            .populate('receivedBy')
            .sort({ createdAt: -1 });

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