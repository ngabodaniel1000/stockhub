// importing mongoose module
const mongoose = require('mongoose');

// creating schema for stock management
const stockInSchema = new mongoose.Schema({
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Products", 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        required: true, 
        enum: ["pending", "received","cancelled"],
        default: "pending"
    },
    receivedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Managers' 
    },
    supplier: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Supplier", 
        required: true 
    },
    company: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Companies", 
        required: true 
    }
}, {
    timestamps: true
});

// make stock model
const StockIn = mongoose.model('StockIn', stockInSchema);

// exporting stock model
module.exports = StockIn;