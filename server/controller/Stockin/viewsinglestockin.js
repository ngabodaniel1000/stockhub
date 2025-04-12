const Purchase = require('../../model/Stockin/Stockin');
const Product = require('../../model/Products/Product');
const Supplier = require('../../model/suppliers/suppliers');

exports.viewSinglePurchase = async (req, res) => {
    const { purchaseId } = req.params;
    const companyId = req.session.company;

    try {
        if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "Company ID is required"
            });
        }

        const purchase = await Purchase.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(purchaseId)
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            {
                $lookup: {
                    from: 'suppliers',
                    localField: 'supplier',
                    foreignField: '_id',
                    as: 'supplierDetails'
                }
            },
            {
                $lookup: {
                    from: 'accounts',
                    localField: 'receivedBy',
                    foreignField: '_id',
                    as: 'receivedByDetails'
                }
            },
            {
                $match: {
                    'productDetails.company': companyId
                }
            },
            {
                $project: {
                    _id: 1,
                    quantity: 1,
                    status: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    product: {
                        $arrayElemAt: ['$productDetails', 0]
                    },
                    supplier: {
                        $arrayElemAt: ['$supplierDetails', 0]
                    },
                    receivedBy: {
                        $arrayElemAt: ['$receivedByDetails', 0]
                    }
                }
            }
        ]);

        if (!purchase || purchase.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Purchase not found"
            });
        }

        return res.status(200).json({
            success: true,
            purchase: purchase[0]
        });

    } catch (error) {
        console.error("Error fetching purchase:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the purchase"
        });
    }
}; 