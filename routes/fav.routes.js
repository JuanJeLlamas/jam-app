const express = require('express')
const User = require('../models/User.model')
const router = express.Router()

router.post("/:id", async (req, res, next) => {
const artistId = req.params
console.log("HOLaaAQ" , artistId)   //Necesitamos requerir la id del artista para añadirlo al array del usuario. Se hara redirect al mismo lugar despues de 
    try {
        
        let response = await User.findById(artistId)
        res.redirect("/groups/list/")

    } catch (err) {
        next(err)
    }


})

// router.post(`/groups/:id/favorites`, async (req, res, next) => {
// //creo que deberia ser ruta dinamica por id del usuario activo
//    const actualUser = req.session.activeUser 
//    const userId = req.params
//    try{
//     await User.findByIdAndUpdate(activeUser._id, {
//         $addToSet: {favourite: userId}
//     })
//    } catch (err){
//     next(err)
//    }

// })

module.exports = router;


      