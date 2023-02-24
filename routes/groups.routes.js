const express = require('express')
const User = require('../models/User.model')
const Comments = require("../models/comments.model");
const router = express.Router()

// GET "/groups/list" => renderiza el listado de grupos que existen según el género musical escogido"
router.get('/list/:genre', async (req, res, next) => {
  
  const genre = req.params.genre
  //console.log(genre)

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
  const creatorUsername = req.session.activeUser._id; // usuario que crea comentario
  console.log("hola", creatorUsername)

  try {
    
    
    const artistDetails = await User.findById(id)
    const commentDetails = await Comments.find({ artistUser: id }).populate("creator")
    let cloneCommentsDetails = JSON.parse(JSON.stringify(commentDetails))
    


    //console.log("CON LA MISMA ID", commentDetails)

    for (let i = 0; i < cloneCommentsDetails.length; i++) {
      
      cloneCommentsDetails[i].mismaId=false;
      let userName = cloneCommentsDetails[i].creator._id
      console.log("adios", userName)
    
      if(userName === creatorUsername) {
        cloneCommentsDetails[i].mismaId = true;
      } 
     console.log("El creador del comentario es", cloneCommentsDetails)

      }
    
    
    res.render('groups/details-artist.hbs', {
      artistDetails: artistDetails,
      cloneCommentsDetails: cloneCommentsDetails,
  
    })
  } catch (error) {
    next(error)
  }
})


module.exports = router
