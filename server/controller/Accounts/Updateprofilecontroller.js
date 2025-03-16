// import manager model
const Manager = require("../../model/Accounts/Managersmodel")
// function to update profile
exports.updateprofile = async (req,res) => {
    // fetch manager id from request parameters
    const managerid = req.params.managerid
    const { email, password,username,companyname } = req.body;
    // find if id exist and trigger update
    const updateuserprofile = await Manager.findByIdAndUpdate(managerid,{
        email,password,username,companyname
    },{new:true})
    if (!updateuserprofile) {
        return res.status(404).json("User not exists");
    }
    // ensure all field was sent in request body
    if (!req.body.email || !req.body.password || !req.body.username || !req.body.companyname) {
        return res.status(400).send("fill all required fields");
    }
    // return response with updated user profile
    return res.status(200).json({message:`Profile updated`})
    
}