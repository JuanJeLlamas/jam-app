const express = require('express');
const User = require('../models/User.model');
const router = express.Router();

// GET "/groups/list"
router.get("/list", async (req, res, next) => {
  // const { role } = req.params;
 
    try {

      const response = await User.find( {role: {$in: req.params.role } } );
  
      res.render("groups/list-artist.hbs", {
        eachArtist: response,
      });
      
    }
    
    catch (err) {
      next(err);
    }
    
  });



  router.get("/:id/details", async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const artistDetails = await User.findById(id);
      res.render("groups/details-artist.hbs", {
        artistDetails: artistDetails,
      });
    } catch (error) {
      next(error);
    }
  });


module.exports = router;
