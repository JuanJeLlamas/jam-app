const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {

    try{
        res.render("user/comments.hbs");
    }
    catch (error){
        next(error)
    }
       
      });







module.exports = router;

