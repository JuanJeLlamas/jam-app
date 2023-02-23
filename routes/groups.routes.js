const express = require('express')
const User = require('../models/User.model')
const Comments = require("../models/comments.model");
const router = express.Router()

// GET "/groups/list" => renderiza el listado de grupos que existen según el género musical escogido"
router.get('/list/:genre', async (req, res, next) => {
  
  const genre = req.params.genre
  console.log(genre)

  try {
    const response = await User.find({ genre: { $in: [genre] } })

    res.render('groups/list-artist.hbs', {
      eachArtist: response,
    })
  } catch (err) {
    next(err)
  }
})

// GET "/groups/:id/details" => renderiza los detalles del grupo musical seleccionado
router.get('/:id/details', async (req, res, next) => {
  const { id } = req.params; // id del artista
  const creadorUsername = req.session.activeUser.username; // usuario que crea comentario
  console.log(creadorUsername)
  let mismaId = false;

  try {
    
    
    const artistDetails = await User.findById(id)
    const commentDetails = await Comments.find({ artistUser: id }).populate("creator")
    //console.log("COMENTARIOS", commentDetails.creator)

    for (let i = 0; i < commentDetails.length; i++) {
      let userName = commentDetails[i].creator.username
      console.log("ARRAY DE CREADORES", userName );
      
      if(userName === creadorUsername) {
        mismaId = true;
      }
      }
    

    //console.log("El creador del comentario es", commentDetails)
    res.render('groups/details-artist.hbs', {
      artistDetails: artistDetails,
      commentDetails: commentDetails,
      mismaId: mismaId,
  
    })
  } catch (error) {
    next(error)
  }
})







module.exports = router
