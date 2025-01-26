exports.dashboard = async (req, res) => {
    try {
      if (req.session.Userid) { // Use the correct session property
        res.status(200).json({
          loggedIn: true,
          user: req.session.username,
          email: req.session.email,
          role: req.session.role,
          userId: req.session.Userid, // Return the correct MongoDB _id
        });
      } else {
        res.status(401).json({ message: "Unauthorized: Not logged in" });
      }
    } catch (error) {
      res.status(500).send({ message: "Error accessing dashboard", error });
    }
  };
  