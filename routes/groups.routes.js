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
  try {
    const { id } = req.params;
    
    const artistDetails = await User.findById(id)
    const commentDetails = await Comments.find({ artistUser: id }).populate("creator")
    
    res.render('groups/details-artist.hbs', {
      artistDetails: artistDetails,
      commentDetails: commentDetails,
  
    })
  } catch (error) {
    next(error)
  }
})







module.exports = router
