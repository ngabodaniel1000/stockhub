// Import Manager model
const Admin = require("../../model/Accounts/Managersmodel");
// function to register company as admin
exports.registeradmin= async(req,res)=>{
  const { email, password,username,companyname,role } = req.body;
   // Validate input
   if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }
  const checkuserexistence = await Admin.findOne({email}) 
  const checkcompanyexistence = await Admin.findOne({companyname}) 
  const newadmin = await new Admin(
    {
      username:req.body.username,
      email:req.body.email,
      password:req.body.password,
      companyname:req.body.companyname,
      role:req.body.role,
    }
  )
  if (checkuserexistence) {
    return res.status(400).json({success:false,message:"User already exists"}); 
  }
  if (checkcompanyexistence) {
    return res.status(400).json({success:false,message:"Company name already taken"}); 
  }
  
  newadmin.save()
  .then(()=>{
    res.status(201).json({message:"Admin registered successfully",success:true});
    
  })
  .catch((err)=>{
    console.log(err);
    
  })
}

// Function to validate login
exports.validateLogin = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    // Check if user exists
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exist" });
    }
    
    if (user.role === "Admin") {
      if (user.password !== password) {
        return res.status(401).json({ success: false, message: "Invalid password" });
      }
      // Store user data in session
      req.session.username = user.username
      req.session.email = user.email
      req.session.password = user.password
      req.session.role = user.role
      req.session.Userid = user._id
      req.session.companyname = user.companyname;
      console.log(req.session);
      return res.status(200).json({ success: true, message: "Logged in as admin", role: "Admin" });
        
    } else {
      return res.status(403).json({ success: false, message: "Failed to log in as admin"});          
    }
    // Compare plaintext password
    
    
    // Check role and respond accordingly
  
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "An error occurred during login" });
  }
};
