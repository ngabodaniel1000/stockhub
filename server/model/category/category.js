// importing mongoose module
const mongoose = require('mongoose');


// creating schema for category collection

const schema = new mongoose.Schema({
    categoryname:{type:String, required:true},
    manager:{type:mongoose.Schema.Types.ObjectId,ref:"Managers"}  
},{
    timestamps: true
}  
)

//make category model
const CategoryModel = mongoose.model('Categories', schema) 


//exporting category model
module.exports = CategoryModel