const express = require('express')
const router = express.Router()

const User = require('../models/User.model.js')

const {
  isLoggedIn,
  isArtist,
  isParticular,
} = require('../middleware/user-middlewares.js')

// GET "/private-profile" => renderiza una vista privada de artista
router.get('/', isLoggedIn, async (req, res, next) => {
  console.log(req.session.activeUser._id) // ESTE ES EL USUARIO QUE ESTA HACIENDO LA LLAMADA, EL USUARIO ACTIVO, TENEMOS ACCESO A ESTO EN TODAS LAS RUTAS

  try {
    const { userId } = req.params
    const response = await User.findById(req.session.activeUser._id)
    res.render('profile/user-profile.hbs', {
      details: response,
    })
  } catch (error) {
    next(error)
  }
})

//GET ----Edicion de perfiles
router.get('/edit', (req, res, next) => {
  res.render('profile/edit-profile.hbs')
})

//POST ----Edicion de perfiles
router.post('/edit', async (req, res, next) => {
  try {
    const userEdit = await User.findByIdAndUpdate(req.session.activeUser._id, {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      genre: req.body.genre,
      description: req.body.description,
      songs: req.body.songs,
      imageShow: req.body.imageShow,
      videoShow: req.body.videoShow,
      contact: req.body.contact,
      imageProfile: req.body.imageProfile
    })
    res.redirect('/private-profile')
  } catch (error) {
    next(error)
  }
})

module.exports = router
