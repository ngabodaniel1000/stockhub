// Importing category model
const Categorymodel = require("../../model/category/category");
const CompanyModel = require("../../model/company/company")

// Controller for viewing all categories for a manager
exports.viewcategory = async (req, res) => {
    const {companyId} = req.params;
    const managerId = req.session.Userid; // Get manager ID from session

    try {
        // Check if company exists
        const existingCompany = await CompanyModel.findOne({ _id: companyId });
        if (!existingCompany) {
            return res.status(400).json({
                success: false,
                message: "Company does not exist"
            });
        }

        // Check if user works for the company
        const managerExists = existingCompany.managers.some(manager => 
            manager.id.toString() === managerId.toString()
        );

        if (!managerExists) {
            return res.status(403).json({
                success: false,
                message: "You don't have access to this company"
            });
        }

        // Find categories for the given company
        const mycategory = await Categorymodel.find({ company: companyId });
        
        if (mycategory.length > 0) {
            // If categories are found, return them
            return res.status(200).json({ 
                allcategories: mycategory, 
                success: true 
            });
        } else {
            // If no categories are found return a message
            return res.status(404).json({ 
                message: "No categories found for this company", 
                success: false 
            });
        }
    } catch (error) {
        // Handle any errors that occur
        console.error("Error fetching categories:", error);
        return res.status(500).json({ 
            message: "An error occurred while fetching categories", 
            success: false 
        });
    }
};