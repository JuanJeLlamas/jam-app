const express = require('express')
const User = require('../models/User.model')
const router = express.Router()

router.get("/", async (req, res, next) => {
 const userParticular = req.session.activeUser
 try{

    const response = await User.findById(userParticular._id)
    .populate( {path: "favourite" } );
     res.render("user/fav-list.hbs", { 
        response : response
        
     })
    
 } catch(err){
    next(err)
 }
   //Necesitamos requerir la id del artista para añadirlo al array del usuario. Se hara redirect al mismo lugar despues de 


})


router.post("/:id", async (req, res, next) => {
//creo que deberia ser ruta dinamica por id del usuario activo
   const { id } = req.params
   const userParticular = req.session.activeUser
   try{
    await User.findByIdAndUpdate(userParticular._id, {
        $addToSet: { favourite: id }
    });
    res.redirect("/")
   } catch (err){
    next(err)
   }

})

module.exports = router;


      