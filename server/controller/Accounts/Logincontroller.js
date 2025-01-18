const Manager = require("../../model/Accounts/Managersmodel")
exports.validatelogin = async(req,res)=>{
  const {username,email,password} = req.body
  res.send(username)
//   const checkuser = await Manager.findOne({email})
// try {
//   if (checkuser) {
//     res.send("Successfully logged in")
//   }
// } catch (error) {
//   res.send("Failed to log in")
// }
}
