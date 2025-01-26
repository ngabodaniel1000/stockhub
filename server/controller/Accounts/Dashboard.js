// Admin dashboard (protected route)
exports.dashboard = async (req, res) => {
    try {
      if (req.session.id) {
        res.json({ loggedIn: true,user:req.session.username,email:req.session.email,role:req.session.role,userid:req.session.id });
      } else {
        res.json({ loggedIn: false });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error accessing dashboard', error });
    }
  }