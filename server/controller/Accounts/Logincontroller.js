// import Manager model
const Manager = require("../../model/Accounts/Managersmodel")

// function to validate login
exports.validatelogin = async (req, res) => {

  // parsing url body
  const { username, email, password } = req.body


  // check if user email exist
  const checkuser = await Manager.findOne({ email })
  try {
    if (checkuser) {
      if (checkuser.password === password) {
        if (checkuser.role === "Admin") {
          res.send("Logged as admin")
        }
        else {
          res.send("logged in as manager")
        }
      }
      else {
        res.send("Invalid password")
      }
    }

    else {
    res.send("user doesnot exists")
  }
} catch (error) {
  res.send("Failed to log in")
}
}
