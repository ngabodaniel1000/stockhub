// importing mongoose module
const mongoose = require('mongoose');


// creating schema for product Sales 

const schema = new mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId,ref:"Products"},
    quantitysold:{type:Number, required:true,},
    totalsales:{type:Number, required:true,unique:true},
    manager:{type:mongoose.Schema.Types.ObjectId,ref:"Managers"}  
},{
    timestamps: true
}  
)

//make sales model
const SalesModel = mongoose.model('Sales', schema) 


//exporting sales model
module.exports = SalesModel