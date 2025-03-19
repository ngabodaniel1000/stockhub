// Import required models
const Company = require('../../model/company/company');
const Manager = require('../../model/Accounts/Managersmodel');

// Function to add a new company
exports.addCompany = async (req, res) => {
    const { companyname, ownername } = req.body;

    try {
        // Validate input
        if (!companyname || !ownername) {
            return res.status(400).json({ 
                success: false, 
                message: "Company name and owner name are required" 
            });
        }

        // Check if company already exists
        const existingCompany = await Company.findOne({ companyname });
        if (existingCompany) {
            return res.status(400).json({
                success: false,
                message: "Company already exists"
            });
        }

        // Create new company
        const newCompany = new Company({
            companyname,
            ownername,
            managers: [
                { id: req.session.Userid }
            ] // Initialize empty managers array
        });

        // Save the company
        await newCompany.save();

        return res.status(201).json({
            success: true,
            message: "Company added successfully",
            company: newCompany
        });

    } catch (error) {
        console.error("Error adding company:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while adding the company"
        });
    }
};

// Function to add manager to company
// exports.addManagerToCompany = async (req, res) => {
//     const { companyId, managerId } = req.body;

//     try {
//         // Validate input
//         if (!companyId || !managerId) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Company ID and Manager ID are required"
//             });
//         }

//         // Find the company and update managers array
//         const company = await Company.findById(companyId);
//         if (!company) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Company not found"
//             });
//         }

//         // Check if manager exists
//         const manager = await Manager.findById(managerId);
//         if (!manager) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Manager not found"
//             });
//         }

//         // Check if manager is already added to company
//         const isManagerExists = company.managers.some(m => m.id.toString() === managerId);
//         if (isManagerExists) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Manager already added to this company"
//             });
//         }

//         // Add manager to company
//         company.managers.push({ id: managerId });
//         await company.save();

//         return res.status(200).json({
//             success: true,
//             message: "Manager added to company successfully",
//             company
//         });

//     } catch (error) {
//         console.error("Error adding manager to company:", error);
//         return res.status(500).json({
//             success: false,
//             message: "An error occurred while adding manager to company"
//         });
//     }
// }; 