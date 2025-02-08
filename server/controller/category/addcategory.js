// importing mongoose
const mongoose = require("mongoose")

// exporting controller to add new category
exports.addcategory = async(req,res)=>{
    // import category model
    const Categorymodel = require("../../model/category/category");

    // fetching data from body
    const categoryname = req.body.categoryname
    const managerid = req.session.Userid

    try {

        // check if all data was snt in body
        if (!categoryname || !managerid) {
            return res.status(400).json({ success: false, message: "Category name and manager id are required" });
          }
          
        // check if manager id is retrived from database or if it is valid
        if (!mongoose.Types.ObjectId.isValid(managerid)) {
            return res.status(400).json({message:"invalid id",success:false}) 
        }  

        const checkcategory = await Categorymodel.findOne({ manager: managerid });

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
            manager:managerid
        })
        addcategory.save()
        .then(()=>{
            res.status(201).json({message:"new category was successfully added",success:true})
        })
        .catch((err)=>{
            res.status(500).json({message:err,success:false}) 
        })
        
    } catch (error) {
       res.json({message:error,success:false}) 
    }

}