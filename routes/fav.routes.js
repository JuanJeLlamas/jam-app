const express = require("express");
const User = require("../models/User.model");
const router = express.Router();
const {
  isLoggedIn,
  isArtist,
  isParticular,
} = require('../middleware/user-middlewares.js')

// router.get("/:id", async (req, res, next) => {
//   //  const userParticular = req.session.activeUser
//   const userParticular = req.session._id;
//   console.log("userParticular" , userParticular)

//   try {
//     const response = await User.findById(userParticular._id)
//     res.render("user/fav-list.hbs", {
//       response: response,
//     });
//   } catch (err) {
//     next(err);
//   }
// });

//Necesitamos requerir la id del artista para añadirlo al array del usuario.
//Se hara redirect al mismo lugar despues de pulsar
router.post("/:artistId", isLoggedIn, async (req, res, next) => {
 
  const { artistId } = req.params;
  const userParticular = req.session.activeUser._id;
  console.log("Hola idparticular", userParticular);
 console.log("hola id", artistId);
  try {
    await User.findByIdAndUpdate(userParticular
  , {
       $addToSet: { favourite: artistId }, 
    });
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

router.post("/:artistId/del", isLoggedIn, async (req, res, next) => {
 
  const { artistId } = req.params;
  const userParticular = req.session.activeUser._id;

  try {
    await User.findByIdAndUpdate(userParticular
  , {
       $pull: { favourite: artistId }, 
    });
    res.redirect("/private-profile/fav");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
