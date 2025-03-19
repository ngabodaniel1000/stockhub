const Purchase = require("../../model/purchase/Purchase");
const Product = require("../../model/product/Product"); // Assuming you have a Product model
const managerid = req.session.Userid

const addpurchase = async (req, res) => {
    try {
        const { product, quantitypurchased, price,isavailable, manager } = req.body;
       const totalpurchases = quantitypurchased * price;
        // Validate input data
        if (!product || !quantitypurchased || !price || !totalpurchases || !manager) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        // Check if the product exists in the Product collection
        const productExists = await Product.findById(product);
        if (!productExists) {
            return res.status(404).json({ message: "Product not found", success: false });
        }

        // Check if the purchase already exists for the manager
        const checkpurchase = await Purchase.findOne({ manager: manager, product: product });
        if (checkpurchase) {
            return res.status(400).json({ message: "Product already exists in your purchases", success: false });
        }

        // Create a new purchase
        const newpurchase = new Purchase({
            product: product,
            quantitypurchased: quantitypurchased,
            price: price,
            totalpurchases: totalpurchases,
            isavailable: isavailable,
            manager: manager
        });

        // Save the new purchase to the database
        await newpurchase.save();

        // Send success response
        res.status(201).json({ message: "Purchase added successfully", success: true, data: newpurchase });

    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};