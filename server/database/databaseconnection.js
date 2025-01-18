const mongoose = require("mongoose")
const connection = mongoose.connect("mongodb://localhost:27017/stockhub")
.then(()=>{
    console.log("Database successfully connected");
    
})
.catch((error)=>{
console.log(error);

})