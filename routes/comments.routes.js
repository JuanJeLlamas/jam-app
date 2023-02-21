const express = require('express');
const Comments = require('../models/comments.model')
const router = express.Router();


router.get('/', (req, res, next) => {
    res.render("user/comments.hbs");
  })

router.post('/', async (req, res, next) => {

    const comment = req.body.comment
    console.log("hola" , comment)
  
    try{
        const response = await Comments.find()
        res.render("user/comments.hbs", {
        comment: response
    }
    )} 
    catch (error){
        next(error)
    }
       
      });







module.exports = router;

