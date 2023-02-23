const express = require('express')
const router = express.Router()

const User = require('../models/User.model.js')

const uploader = require('../middleware/cloudinary.js')

const {
  isLoggedIn,
  isArtist,
  isParticular,
} = require('../middleware/user-middlewares.js')

// GET "/private-profile" => renderiza una vista privada de artista
router.get('/', isLoggedIn, async (req, res, next) => {
  console.log(req.session.activeUser._id) // ESTE ES EL USUARIO QUE ESTA HACIENDO LA LLAMADA, EL USUARIO ACTIVO, TENEMOS ACCESO A ESTO EN TODAS LAS RUTAS

  try {
    const response = await User.findById(req.session.activeUser._id)
    res.render('profile/user-profile.hbs', {
      details: response,
    })
  } catch (error) {
    next(error)
  }
})

//GET ----Edicion de perfiles
router.get('/edit', isLoggedIn, async (req, res, next) => {
  try {
    const response = await User.findById(req.session.activeUser._id)
    res.render('profile/edit-profile.hbs', {
      userInfo: response,
    })
  } catch (error) {
    next(error)
  }
})

//POST ----Edicion de perfiles
router.post(
  '/edit',
  // uploader.single('imageShow'),
  // uploader.single('songs'),
  // uploader.single('videoShow'),
  uploader.single('imageProfile'),
  isLoggedIn,
  async (req, res, next) => {
    console.log(req.session.activeUser._id)

    // let imageShow
    // if (req.file !== undefined) {
    //   imageShow = req.file.path
    // }
    // let songs
    // if (req.file !== undefined) {
    //   songs = req.file.path
    // }

    // let videoShow
    // if (req.file !== undefined) {
    //   videoShow = req.file.path
    // }

    let imageProfile
    if (req.file !== undefined) {
      imageProfile = req.file.path
    }

    try {
      const userEdit = await User.findByIdAndUpdate(
        req.session.activeUser._id,
        {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          genre: req.body.genre,
          description: req.body.description,
          songs: req.body.songs,
          videoShow: req.body.videoShow,
          contact: req.body.contact,
          imageProfile: imageProfile,
        },
      )

      res.redirect('/private-profile')
    } catch (error) {
      next(error)
    }
  },
)

// Intentando cargar varias imagenes

//GET

router.get('/uploadimg', isLoggedIn, async (req, res, next) => {
  console.log(req.session.activeUser._id)

  try {
    const response = await User.findById(req.session.activeUser._id)
    res.render('profile/user-profile.hbs', {
      details: response,
    })
  } catch (error) {
    next(error)
  }
})

//POST para cargar imagenes
router.post(
  '/uploadimg',
  uploader.single('imageShow'),
  isLoggedIn,
  async (req, res, next) => {
    console.log(req.session.activeUser._id)

    let imageShow
    if (req.file !== undefined) {
      imageShow = req.file.path
    }

    try {
      const userEdit = await User.findByIdAndUpdate(
        req.session.activeUser._id,
        { $push: { imageShow: imageShow } },
      )

      res.redirect('/private-profile')
    } catch (error) {
      next(error)
    }
  },
)

//----------------------------------------------------

router.post('/delete', isLoggedIn, (req, res, next) => {
  User.findByIdAndDelete(req.session.activeUser._id)
    .then(() => {
      req.session.destroy(() => {
        res.redirect('/')
      })
    })
    .catch((err) => {
      next(err)
    })
})


// router.get("/fav",  async(req, res, next) => {
//      const userParticularfavs = req.session.activeUser.favourite
//     console.log("userParticular" , userParticularfavs)
  
//     try {
//       const response = await User.findById(userParticular._id)
     
//       res.render("user/fav-list.hbs", {
//         response: response,
//       });
//     } catch (err) {
//       next(err);
//     }
//   });


  router.get('/fav', isLoggedIn, async (req, res, next) => {
    try {
      const response = await User.findById(req.session.activeUser._id).populate({
        path: "favourite",
      });
      console.log(response)
      res.render('user/fav-list.hbs', {
        favorito: response.favourite
        
      })
    } catch (error) {
      next(error)
    }
  })
  
module.exports = router

// try {
//   const response = await User.findById(userParticular._id).populate({
//     path: "favourite",
//   });
//   res.render("user/fav-list.hbs", {
//     response: response,
//   });
// }