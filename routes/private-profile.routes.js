const express = require('express');
const router = express.Router();

const { isLoggedIn, isArtist, isParticular } = require("../middleware/user-middlewares.js")

// GET "/private-profile" => renderiza una vista privada de artista
router.get("/", isLoggedIn, (req, res, next) => {

  res.render("profile/user-profile.hbs")

})

router.get("/:userId", isLoggedIn, async (req, res, next) => {
  try {
      const { userId } = req.params;
      const response = await User.findById(userId)
      res.render("profile/user-profile.hbs", {
          details: response,
      });
  } catch (error) {
      next(error);
  }
});






module.exports = router;