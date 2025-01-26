// Middleware to ensure user is authenticated
exports.ensureAuthenticated = (req, res, next) => {
    if (req.session.id) {
        next();
    } else {
        res.status(403).json({message:"Unauthorized to this api"});
    }
};