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
      req.session.id = user._id
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
