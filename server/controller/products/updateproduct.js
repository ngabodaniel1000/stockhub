// Importing Product model
const Productmodel = require("../../model/Products/Product");

// Controller to update a specific Product
exports.updateProduct = async (req, res) => {
    const { ProductId } = req.params; // Get Product ID from request parameters

     // fetching data from body
     const productname = req.body.productname
     const productprice = req.body.price
     const productcategory = req.body.category
     const companyId = req.session.company; // Get manager ID from session

     try {
         if(!companyId){
             return res.status(400).json({
                 success: false,
                 message: "Company ID is required"
             });
         }
        // Find the Product by ID
        const Product = await Productmodel.findOne({ _id: ProductId,company:companyId });

        // Check if the Product exists
        if (!Product) {
            return res.status(404).json({ 
                updatedid:ProductId,
                message: "Product not found", 
                success: false 
            });
        }


        // Update the Product
        const updatedProduct = await Productmodel.findByIdAndUpdate(
            ProductId, 
            {
            productname:productname,
            price:productprice,
            category:productcategory }, // Update the Product name
            { new: true } // Return the updated document
        );

        // Return success response with the updated Product
        return res.status(200).json({ 
            message: "Product updated successfully", 
            success: true, 
            updatedProduct 
        });
    } catch (error) {
        // Handle any errors that occur
        console.error("Error updating Product:", error);
        return res.status(500).json({ 
            message: "An error occurred while updating the Product", 
            success: false 
        });
    }
};