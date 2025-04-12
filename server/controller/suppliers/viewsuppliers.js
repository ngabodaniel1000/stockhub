const Supplier = require('../../model/suppliers/suppliers');

exports.viewSuppliers = async (req, res) => {
    const companyId = req.session.company;

    try {
        if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "Company ID is required"
            });
        }

        const suppliers = await Supplier.find({ company: companyId })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            suppliers: suppliers
        });

    } catch (error) {
        console.error("Error fetching suppliers:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching suppliers"
        });
    }
}; 