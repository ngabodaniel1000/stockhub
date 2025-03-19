// Import required models
const Admin = require("../../model/Accounts/Managersmodel");
const Company = require("../../model/company/company");

// function to register company as admin
exports.registeradmin = async(req, res) => {
  const { email, password, username } = req.body;
  
  // Validate input
  if (!email || !password || !username) {
    return res.status(400).json({ 
      success: false, 
      message: "Email, password and username are required" 
    });
  }

  try {
    // check if user already exists with email
    const checkuserexistence = await Admin.findOne({email});
    if (checkuserexistence) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      }); 
    }

    // First create the company
    const newCompany = new Company({
      companyname: username + "'s Company", // Default company name
      ownername: username,
      managers: [] // We'll update this after creating admin
    });

    // Save the company first
    const savedCompany = await newCompany.save();

    // create new admin account with company reference
    const newadmin = new Admin({
      username,
      email,
      password,
      role: 'Admin',
      active:true,
      company: savedCompany._id  // Set company reference immediately
    });

    // Save the admin
    const savedAdmin = await newadmin.save();

    // Update company's managers array with the new admin
    savedCompany.managers.push({ id: savedAdmin._id });
    await savedCompany.save();

    res.status(201).json({
      success: true,
      message: "Admin and company registered successfully",
      admin: savedAdmin,
      company: savedCompany
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error registering admin",
      error: err.message
    });
  }
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
    // check if user role is admin
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
      req.session.companyname = user.company;
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
