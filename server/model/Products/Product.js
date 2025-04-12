// importing mongoose module
const mongoose = require('mongoose');


// creating schema for Products collection

const schema = new mongoose.Schema({
    productname:{type:String, required:true},
    description:{type:String, required:true},
    quantity:{type:Number,default:0, min:0},
    category:{type:mongoose.Schema.Types.ObjectId,ref:"Categories"},
    image:{type:String, required:false},
    company:{type:mongoose.Schema.Types.ObjectId,ref:"companies"},
},{
    timestamps: true
}  
)

//make product model
const ProductsModel = mongoose.model('Products', schema) 


//exporting product model
module.exports = ProductsModel