// importing mongoose
const mongoose = require("mongoose")

// exporting controller to add new product
exports.addproduct = async(req,res)=>{
    // import product model
    const productmodel = require("../../model/Products/Product");

    // fetching data from body
    const productname = req.body.productname
    const productprice = req.body.price
    const productcategory = req.body.category
    const managerid = req.session.Userid

    try {

        // check if all data was sent in body
        if (!productname || !managerid || !productprice || !productcategory) {
            return res.status(400).json({ success: false, message: "fill all required fields" });
          }
          
        // check if manager id is retrived from database or if it is valid
        if (!mongoose.Types.ObjectId.isValid(managerid)) {
            return res.status(400).json({message:"invalid manager id",success:false}) 
        }  
        // check if manager id is retrived from database or if it is valid
        if (!mongoose.Types.ObjectId.isValid(managerid)) {
            return res.status(400).json({message:"invalid category id",success:false}) 
        }  
     
        // Check if the product name already exists (case-insensitive)
        const checkproduct = await productmodel.findOne({ manager: managerid });

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
            manager:managerid,
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