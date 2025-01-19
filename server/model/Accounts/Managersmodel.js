// importing mongoose module
const mongoose = require('mongoose');


// creating schema for managers account

const schema = new mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String, required:true,},
    email:{type:String, required:true,unique:true},
    role:{type:String, required:true},
    
})

//make manager model
const ManagersModel = mongoose.model('Managers', schema) 


//exporting manager model
module.exports = ManagersModel