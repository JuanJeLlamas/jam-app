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
 // console.log("Este es el id del artista al que hacemos el comentario", id);

  try {
    const response = await User.findById(id);

    res.render("user/comments.hbs", {
      response: response,
    });
  } catch (err) {
    next(err);
  }
});

// POST "/comments/:id" => guarda la información del formulario de comentarios y la sube a la DB
router.post("/:id", isLoggedIn, async (req, res, next) => {
  const id = req.params.id; // id del artista al que va dirigido el comentario
  const comment = req.body.comment;
  const creadorId = req.session.activeUser._id; // id del creador del comentario
 // console.log(id, comment, creadorId)

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
router.post("/:id/delete", isLoggedIn, async (req, res, next) => {
  const { id } = req.params; // id del comentario eliminado
  console.log("Eliminar comentario", id)

  try {
  const commentToDelete = await Comments.findByIdAndDelete(id).populate("artistUser");
 // console.log("COMENTARIO A ELIMINAR", commentToDelete.artistUser._id)
  const artistId = commentToDelete.artistUser._id
//  console.log("ESTE ES EL ID DEL ARTISTA", artistId)

    res.redirect(`/groups/${artistId}/details`);
    
  } 

  catch (error) {
    next(error);
  }
});

// GET "/comments/:id/edit" => renderiza el formulario de edición del comentario
router.get("/:id/edit", isLoggedIn, async (req, res, next) => {
  const { id } = req.params; // id del comentario
  const creadorUsername = req.session.activeUser.username; // id del usuario que crea el comentario
  
 // console.log("ID DEL CREADOR", creadorUsername)

  try {
    const commentToUpdate = await Comments.findById(id).populate("creator");
    //console.log("USUARIO QUE COMENTA", commentToUpdate.creator.username)

    if(creadorUsername !== commentToUpdate.creator.username) {
      res.render("sin-autorizacion.hbs", {
        errorMessage: 'No puedes editar el comentario de otra persona'
      })
      return;
    }
    res.render("user/edit-comment.hbs", {
      commentToUpdate: commentToUpdate
    });

  } catch (error) {
    next(error);
  }
});



// POST "/comments/:id/edit" => guarda la información del formulario y la guarda en la DB
router.post("/:id/edit", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;

  try {
    const artistComment = await Comments.findById(id).populate("artistUser")
    const artistId = artistComment.artistUser._id

    console.log("Este es el id del comentario", artistId)

    const commentToUpdate = await Comments.findByIdAndUpdate(id, {
      comment: req.body.comment,
    });
    
    res.redirect(`/groups/${artistId}/details`);

  } catch (error) {
    next(error);
  }
});

module.exports = router;
