// importing mongoose
const mongoose = require("mongoose")


// making connection
const connection = mongoose.connect("mongodb://localhost:27017/stockhub")
.then(()=>{
    console.log("Database successfully connected");
    
})
.catch((error)=>{
console.log(error);

})