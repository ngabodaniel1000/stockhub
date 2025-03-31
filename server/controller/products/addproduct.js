// importing mongoose
const mongoose = require("mongoose")

// exporting controller to add new product
exports.addproduct = async(req,res)=>{
    // import product model
    const productmodel = require("../../model/Products/Product");
    const categorymodel = require("../../model/category/category")

    // fetching data from body
    const productname = req.body.productname
    const productprice = req.body.price
    const productcategory = req.body.category
    const companyId = req.session.company

    try {
        if(!companyId){
            return res.status(400).json({
                success: false,
                message: "Company ID is required"
            });
        }
        // check if all data was sent in body
        if (!productname || !companyId || !productprice || !productcategory) {
            return res.status(400).json({ success: false, message: "fill all required fields" });
          }
          // check if category name exists
                 const checkcategory = await categorymodel.findOne({ company:companyId,_id:productcategory});
                 if (!checkcategory) {   
                    return res.status(404).json({ 
                        message: "product category not exist in your category", 
                        success: false 
                    });
                 } 
          
     
        // Check if the product name already exists (case-insensitive)
        const checkproduct = await productmodel.findOne({ manager: companyId });

        if (checkproduct) {
            if (checkproduct.productname.toLowerCase().includes(productname.toLowerCase())) {
                return res.status(400).json({ 
                    message: "product name already exists in your products", 
                    success: false 
                });
            }
        }

        // adding new product
        const addproduct = await new productmodel({
            productname:productname,
            price:productprice,
            company:companyId,
            category:productcategory
        })
        // save new product in mongodb
        addproduct.save()
        .then(()=>{
            res.status(201).json({message:"new product was successfully added",success:true})
        })
        .catch((err)=>{
            res.status(500).json({message:err,success:false}) 
        })
        // catch any error that occurs
    } catch (error) {
       res.json({message:error,success:false}) 
    }
}