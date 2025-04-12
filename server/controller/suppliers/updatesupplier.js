const Supplier = require('../../model/suppliers/suppliers');

exports.updateSupplier = async (req, res) => {
    const { supplierId } = req.params;
    const { name, contactEmail, phone, address } = req.body;
    const companyId = req.session.company;

    try {
        if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "Company ID is required"
            });
        }

        // Check if supplier exists and belongs to the company
        const existingSupplier = await Supplier.findOne({ 
            _id: supplierId,
            company: companyId 
        });

        if (!existingSupplier) {
            return res.status(404).json({
                success: false,
                message: "Supplier not found"
            });
        }

        // Check if new name conflicts with existing suppliers
        if (name && name.toLowerCase() !== existingSupplier.name.toLowerCase()) {
            const nameConflict = await Supplier.findOne({
                company: companyId,
                name: { $regex: new RegExp(name, 'i') },
                _id: { $ne: supplierId }
            });

            if (nameConflict) {
                return res.status(400).json({
                    success: false,
                    message: "Supplier with this name already exists for your company"
                });
            }
        }

        // Update supplier
        const updatedSupplier = await Supplier.findByIdAndUpdate(
            supplierId,
            {
                name: name || existingSupplier.name,
                contactEmail: contactEmail || existingSupplier.contactEmail,
                phone: phone || existingSupplier.phone,
                address: address || existingSupplier.address
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Supplier updated successfully",
            supplier: updatedSupplier
        });

    } catch (error) {
        console.error("Error updating supplier:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the supplier"
        });
    }
}; 