const Manager = require("../../model/Accounts/Managersmodel")
exports.updateprofile = async (req,res) => {
    const managerid = req.params.managerid
    const { email, password,username,companyname } = req.body;
    const updateuserprofile = await Manager.findByIdAndUpdate(managerid,{
        email,password,username,companyname
    },{new:true})
    if (!updateuserprofile) {
        return res.status(404).json("User not exists");
    }
    
    if (!req.body.email || !req.body.password || !req.body.username || !req.body.companyname) {
        return res.status(400).send("fill all required fields");
    }
    return res.status(200).json({message:`Profile updated`})
    
}