// Import Manager model
const Manager = require("../../model/Accounts/Managersmodel");

// Function to validate login
exports.validateLogin = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    // Check if user exists
    const user = await Manager.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exist" });
    }

    // Compare plaintext password
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }


    // Check role and respond accordingly
    if (user.role === "Manager") {
      req.session.username = user.username
      req.session.email = user.email
      req.session.role = user.role
      req.session.Userid = user._id
      console.log(req.session);
      return res.status(200).json({ success: true, message: "Logged in as manager", role: "Admin" });
        // Store user data in session
    } else {
      return res.status(200).json({ success: false, message: "Failed to log in as manager", });
      
             
        // Store user data in session
    }
  
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "An error occurred during login" });
  }
};

exports.registermanager = async(req,res)=>{
  const { email, password,username,companyname,role } = req.body;
   // Validate input
   if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }
// create new manager account
  const newadmin = await new Manager(
    {
      username:req.body.username,
      email:req.body.email,
      password:req.body.password,
      companyname:req.body.companyname,
      role:req.body.role,
    }
  )
  // check if user email already exist
  const checkuserexistence = await Manager.findOne({email}) 
  if (checkuserexistence) {
    return res.status(400).json({success:false,message:"User already exists"}); 
  }
  // check if company name was taken
  const checkcompanyexistence = await Manager.findOne({companyname}) 
  if (!checkcompanyexistence) {
    return res.status(400).json({success:false,message:"No Company found"}); 

  // save new manager account in mongodb db
  newadmin.save()
  .then(()=>{
    res.status(201).send("Manager registered successfully");
    
  })
  .catch((err)=>{
    console.log(err);
    
  })
}}