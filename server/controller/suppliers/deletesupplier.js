const Supplier = require('../../model/suppliers/suppliers');

exports.deleteSupplier = async (req, res) => {
    const { supplierId } = req.params;
    const companyId = req.session.company;

    try {
        if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "Company ID is required"
            });
        }

        // Check if supplier exists and belongs to the company
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

        // Delete the supplier
        await Supplier.findByIdAndDelete(supplierId);

        return res.status(200).json({
            success: true,
            message: "Supplier deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting supplier:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the supplier"
        });
    }
}; 