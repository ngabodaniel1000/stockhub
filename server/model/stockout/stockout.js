const mongoose = require('mongoose');

const stockOutSchema = new mongoose.Schema({
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
        enum: ["pending", "processed", "cancelled"],
        default: "pending"
    },
    processedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Managers',
        required: true
    },
    customer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Customer",
        default:null
    },
    reason: {
        type: String,
        required: true,
        enum: ["sale", "damaged", "lost", "other"],
        default: "sale"
    },
    company: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Companies", 
        required: true 
    }
}, {
    timestamps: true
});

const StockOut = mongoose.model('StockOut', stockOutSchema);

module.exports = StockOut;