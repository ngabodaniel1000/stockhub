// importing mongoose module
const mongoose = require('mongoose');


// creating schema for manager personal Settings

const schema = new mongoose.Schema({
    language:{type:String, required:false,default:"english"},
    stockminlevel:{type:Number, required:false,default:10},
    currency:{type:String, required:false,default:"frw"},
    darkmode:{type:Boolean, required:true,default:false},
    manager:{type:mongoose.Schema.Types.ObjectId,ref:"Managers"}  
}, {
    timestamps: true
})

//make setting model
const SettingsModel = mongoose.model('Settings', schema) 


//exporting setting model
module.exports = SettingsModel