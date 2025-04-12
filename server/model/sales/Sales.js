// importing mongoose module
const mongoose = require('mongoose');


// creating schema for product Sales 

const schema = new mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId,ref:"Products"},
    quantity:{type:Number, required:true,},
    issuedby:{type:mongoose.Schema.Types.ObjectId,ref:"Managers"},
    reason:{type:String,required:true,enum:["sold","damaged","returned"]},
    company:{type:mongoose.Schema.Types.ObjectId,ref:"Companies"},
},{
    timestamps: true
}  
)

//make sales model
const SalesModel = mongoose.model('Sales', schema) 


//exporting sales model
module.exports = SalesModel