const Supplier = require('../../model/suppliers/suppliers');

exports.viewSingleSupplier = async (req, res) => {
    const { supplierId } = req.params;
    const companyId = req.session.company;

    try {
        if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "Company ID is required"
            });
        }

        const supplier = await Supplier.findOne({ 
            _id: supplierId,
            company: companyId 
        });

        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: "Supplier not found"
            });
        }

        return res.status(200).json({
            success: true,
            supplier: supplier
        });

    } catch (error) {
        console.error("Error fetching supplier:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the supplier"
        });
    }
}; 