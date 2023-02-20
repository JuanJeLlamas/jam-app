const express = require('express');
const router = express.Router();

const { isLoggedIn, isArtist, isParticular } = require("../middleware/user-middlewares.js")

// GET "/private-profile" => renderiza una vista privada de artista
router.get("/", isLoggedIn, (req, res, next) => {

  res.render("profile/user-profile.hbs")

})







module.exports = router;