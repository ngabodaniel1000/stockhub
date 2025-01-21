// import Manager model
const Manager = require("../../model/Accounts/Managersmodel")

// function to validate login
exports.validatelogin = async (req, res) => {

  // parsing url body
  const {email, password } = req.body


  // check if user email exist
  const checkuser = await Manager.findOne({ email })
  try {
    // consition for checking user credentials
    if (checkuser) {
      if (checkuser.password === password) {
        if (checkuser.role === "Admin") {
          res.status(200).send("Logged as admin")
        }
        else {
          res.status(200).send("logged in as manager")
        }
      }
      else {
        res.status(401).send("Invalid password")
      }
    }

    else {
    res.send("user doesnot exists")
  }
} catch (error) {
  res.send("Failed to log in")
}
}
