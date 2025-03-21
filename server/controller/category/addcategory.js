// importing modules
const mongoose = require("mongoose")
const Categorymodel = require("../../model/category/category");
const CompanyModel = require("../../model/company/company")

// exporting controller to add new category
exports.addcategory = async(req,res)=>{

    // fetching data from body
    const categoryname = req.body.categoryname
    const {companyId} = req.params

    try {

        // check if all data was sent in body
        if (!categoryname || !companyId) {
            return res.status(400).json({ success: false, message: "Category name and company id are required" });
          }
          
        // check if manager id is retrived from database or if it is valid
        if (!mongoose.Types.ObjectId.isValid(companyId)) {
            return res.status(400).json({message:"invalid id",success:false}) 
        }  
        // Check if company exists
                const existingCompany = await CompanyModel.findOne({ _id:companyId });
                if (!existingCompany) {
                    return res.status(400).json({
                        success: false,
                        message: "Company doesnot exists"
                    });
                }

        // check if category name already exists
        const checkcategory = await Categorymodel.findOne({ company: companyId });

        if (checkcategory) {
            // Check if the category name already exists (case-insensitive)
            if (checkcategory.categoryname.toLowerCase().includes(categoryname.toLowerCase())) {
                return res.status(400).json({ 
                    message: "Category name already exists in your categories", 
                    success: false 
                });
            }
        }

        // adding new category
        const addcategory = await new Categorymodel({
            categoryname:categoryname,
            company:companyId
        })
        // save new category
        addcategory.save()
        .then(()=>{
         // return success response
            res.status(201).json({message:"new category was successfully added",success:true})
        })
        .catch((err)=>{
            res.status(500).json({message:err,success:false}) 
        })
        
    } catch (error) {
       res.json({message:error,success:false}) 
    }

}