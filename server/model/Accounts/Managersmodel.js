const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true,},
    email:{type:String, required:true,unique:true},
    role:{type:String, required:true},
    
})
const ManagersModel = mongoose.model('Managers', schema) 
module.exports = ManagersModel