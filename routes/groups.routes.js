const express = require('express');
const User = require('../models/User.model');
const router = express.Router();

// GET "/groups/list"
router.get("/list", async (req, res, next) => {
    try {
      const response = await User.find();
  
      res.render("groups/list-artist.hbs", {
        eachArtist: response,
      });
    } catch (err) {
      next(err);
    }
  });


module.exports = router;
