const express = require('express');
const router = express.Router();

const { isLoggedIn, isArtist, isParticular } = require("../middleware/user-middlewares.js")

// GET "/profile" => renderiza una vista privada de artista
router.get("/artist", isLoggedIn, isArtist, (req, res, next) => {

  res.render("profile/artist-profile.hbs")

})

router.get("/particular", isLoggedIn, isParticular, (req, res, next) => {

    res.render("profile/particular-profile.hbs")
  
  })
  





module.exports = router;