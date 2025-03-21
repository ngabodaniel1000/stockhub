// importing mongoose module
const mongoose = require('mongoose');


// creating schema for product Purchases 

const schema = new mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId,ref:"Products"},
    quantitypurchased:{type:Number, required:true},
    price:{type:Number, required:true},
    totalpurchases:{type:Number, required:true},
    isavailable:{type:Boolean, required:true,default:true},
    manager:{type:mongoose.Schema.Types.ObjectId,ref:"Managers"}
},{
    timestamps: true
}  
)

//make purchase model
const PurchasesModel = mongoose.model('Purchases', schema) 


//exporting purchase model
module.exports = PurchasesModel