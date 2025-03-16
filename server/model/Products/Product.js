// importing mongoose module
const mongoose = require('mongoose');


// creating schema for Products collection

const schema = new mongoose.Schema({
    productname:{type:String, required:true},
    price:{type:Number ,required:true},
    category:{type:mongoose.Schema.Types.ObjectId,ref:"category"},
    manager:{type:mongoose.Schema.Types.ObjectId,ref:"Managers"}  
},{
    timestamps: true
}  
)

//make product model
const ProductsModel = mongoose.model('Products', schema) 


//exporting product model
module.exports = ProductsModel