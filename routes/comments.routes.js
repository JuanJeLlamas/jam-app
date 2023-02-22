const express = require("express");
const Comments = require("../models/comments.model");
const User = require("../models/User.model");
const router = express.Router();
const { updateLocals } = require("../middleware/user-middlewares.js");
router.use(updateLocals);

const {
  isLoggedIn,
  isArtist,
  isParticular,
} = require("../middleware/user-middlewares.js");

// GET "/comments/:id" => renderiza el formulario para añadir una reseña al grupo seleccionado según su id
router.get("/:id", isLoggedIn, async (req, res, next) => {
  const id = req.params.id;
  console.log(id);

  try {
    const response = await User.findById(id);

    res.render("user/comments.hbs", {
      response: response,
    });
  } catch (err) {
    next(err);
  }
});

// POST "/comments/:id" => guarda la información del formulario de comentarios y
router.post("/:id", isLoggedIn, async (req, res, next) => {
  const id = req.params.id;
  const comment = req.body.comment;
  const creadorId = req.session.activeUser._id;

  try {
    const response = await Comments.create({
      comment: comment,
      creator: creadorId,
      artistUser: id,
    });

    res.redirect(`/groups/${id}/details`);
  } catch (error) {
    next(error);
  }
});

// POST "/comments/:id/delete"
router.post("/:id/delete", async (req, res, next) => {
  const { id } = req.params;

  try {
    await Comments.findByIdAndDelete(id);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

// GET "/comments/:id/edit" => renderiza el formulario de edición del comentario
router.get("/:id/edit", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;

  try {
    const commentToUpdate = await Comments.findByIdAndUpdate();
    res.render("user/edit-comment.hbs");

  } catch (error) {
    next(error);
  }
});



// post "/comments/:id/edit" => guarda la información del formulario y la guarda en la DB
// router.post("/:id/edit", isLoggedIn, asyn (req, res, next) => {
  
// })


module.exports = router;
