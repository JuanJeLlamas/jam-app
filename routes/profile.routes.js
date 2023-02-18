const express = require('express')
const router = express.Router()

const User = require('../models/User.model.js')
const bcrypt = require('bcryptjs')

//GET /profile/signup----------Para crear una cuenta--------

router.get('/signup', (req, res, next) => {
  res.render('user/signup.hbs')
})

//POST /profile/signup--------------------------------------

router.post('/signup', async (req, res, next) => {
  const { username, email, password } = req.body

  if (username === '' || email === '' || password === '') {
    res.status(401).render('user/signup.hbs', {
      errorMessage: 'Todos los campos son obligatorios',
    })
    return
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

  if (passwordRegex.test(password) === false) {
    res.render('user/signup.hbs', {
      errorMessage:
        'La contraseña debe tener un mininmo 8 caracteres, una mayuscula, una minuscula y un caracter especial',
    })
    return
  }

  try {
    const correctUser = await User.findOne({ username: username })

    if (correctUser !== null) {
      res.render('user/signup.hbs', {
        errorMessage: 'Nombre de usuario ya existe',
      })
      return
    }

    const correctEmail = await User.findOne({ email: email })

    console.log(correctEmail)
    if (correctEmail !== null) {
      res.render('user/signup.hbs', {
        errorMessage: 'Ya hay una cuenta creada con esta direccion de correo',
      })
      return
    }

    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, salt)

    const trueUser = await User.create({
      username: username,
      email: email,
      password: hashPassword,
    })

    res.redirect('/profile/login')
  } catch (error) {
    next(error)
  }
})

// GET /profile/login---------Para el acceso----------------

router.get('/login', (req, res, next) => {
  res.render('user/login.hbs')
})

// POST /profile/login--------------------------------------

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body

  // Validaciones para el acceso -------------------------

  if (username === '' || password === '') {
    res.render('user/login.hbs', {
      errorMessage: 'Todos los campos son obligatorios',
    })
    return
  }

  // Creacion de usuario en BD ---------------------------

  try {
    const userLogin = await User.findOne({ username })
    if (userLogin === null) {
      res.render('user/login.hbs', {
        errorMessage: 'Usuario no encontrado',
      })
      return
    }

    // Verificación de password -----------------------------

    const correctPassword = await bcrypt.compare(password, userLogin.password)
    if (correctPassword === false) {
      res.render('user/login.hbs', {
        errorMessage: 'Contraseña incorrecta',
      })
      return
    }

    // res.redirect('/')

    // Mantener activa una sesion -----------------------------

    req.session.activeUser = userLogin
    req.session.save(() => {
  
        
        res.redirect("/");
      })
  } catch (error) {
    next(error)
  }
})

module.exports = router
