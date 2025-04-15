// Import Manager model
const { default: mongoose } = require("mongoose");
const Manager = require("../../model/Accounts/Managersmodel");
const Company = require("../../model/company/company");
const Setting = require("../../model/settings/Settings")

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

    // Check role and active status
    if (user.role === "manager") {
      // Check if account is active
      if (!user.active) {
        return res.status(403).json({ 
          success: false, 
          message: "Account is pending activation. Please contact your admin." 
        });
      }

      // Store user data in session
      req.session.username = user.username;
      req.session.email = user.email;
      req.session.role = user.role;
      req.session.Userid = user._id;
      req.session.company = user.company;
      
      return res.status(200).json({ 
        success: true, 
        message: "Logged in as manager", 
        role: "Manager" 
      });
    } else {
      return res.status(403).json({ 
        success: false, 
        message: "Failed to log in as manager" 
      });
    }
  
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "An error occurred during login" 
    });
  }
};

exports.registermanager = async(req, res) => {
  const { email, password, username, company } = req.body;
  
  // Validate input
  if (!email || !password || !username || !company) {
    return res.status(400).json({ 
      success: false, 
      message: "Email, password, username and company are required" 
    });
  }

  try {
    // check if user email already exists
    const checkuserexistence = await Manager.findOne({email});
    if (checkuserexistence) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      }); 
    }
    if (!mongoose.isValidObjectId(company)) {
      return res.status(400).json({
        success: false,
        message: "Enter valid id"
      }); 
    }

    // check if company exists
    const companyExists = await Company.findById(company);
    if (!companyExists) {
      return res.status(400).json({
        success: false,
        message: "Company not found"
      }); 
    }

    // create new manager account
    const newManager = new Manager({
      username,
      email,
      password,
      company,    // Reference to company ID
      role: 'manager',  // Set role as manager by default
      active: false    // Set initially as inactive, requiring admin approval
    });

    // Save the manager
    const savedManager = await newManager.save();

    // const setting = await new Setting({manager:savedManager._id,darkmode:true})
    // setting.save()
    

    // Add manager to company's managers array
    companyExists.managers.push({ 
      managerid: savedManager._id,
      notificationStatus: 'unread' // Add notification status
    });
    await companyExists.save();

    res.status(201).json({
      success: true,
      message: "Manager registered successfully. Waiting for admin approval.",
      manager: savedManager
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error registering manager",
      error: err.message
    });
  }
}