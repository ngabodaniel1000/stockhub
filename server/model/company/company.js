// importing mongoose module
const mongoose = require('mongoose');


// creating schema for Companys account

const schema = new mongoose.Schema({
    companyname:{type:String, required:true},
    ownername:{type:String, required:true},
    managers:[{
        _id:false,
        managerid:{type:mongoose.Schema.Types.ObjectId,ref:"Managers"}}],
    createdAt:{
        type: Date,
        default: Date.now
    }
})

//make Company model
const CompanyModel = mongoose.model('Companies', schema) 


//exporting Company model
module.exports = CompanyModel