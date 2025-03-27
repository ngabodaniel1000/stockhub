// Middleware to ensure user is authenticated
exports.ensureAuthenticated = (req, res, next) => {
    if (req.session.Userid) {
        next();
    } else {
        res.status(403).json({message:"Unauthorized to this api"});
    }
};

// Middleware to check if user is an admin
exports.isAdmin = (req, res, next) => {
    if (req.session.role === "Admin") {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: "Access denied. Admin privileges required."
        });
    }
};

