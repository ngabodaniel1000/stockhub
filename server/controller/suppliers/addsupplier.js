const Supplier = require('../../model/suppliers/suppliers');

exports.addSupplier = async (req, res) => {
    const { name, contactEmail, phone, address } = req.body;
    const companyId = req.session.company;

    try {
        if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "Company ID is required"
            });
        }

        // Check if all required fields are provided
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Supplier name is required"
            });
        }

        // Check if supplier with same name already exists for this company
        const existingSupplier = await Supplier.findOne({ 
            company: companyId,
            name: { $regex: new RegExp(name, 'i') }
        });

        if (existingSupplier) {
            return res.status(400).json({
                success: false,
                message: "Supplier with this name already exists for your company"
            });
        }

        // Create new supplier
        const newSupplier = new Supplier({
            name,
            contactEmail,
            phone,
            address,
            company: companyId
        });

        await newSupplier.save();

        return res.status(201).json({
            success: true,
            message: "Supplier added successfully",
            supplier: newSupplier
        });

    } catch (error) {
        console.error("Error adding supplier:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while adding the supplier"
        });
    }
}; 