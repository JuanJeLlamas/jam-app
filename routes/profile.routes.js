const express = require('express');
const router = express.Router();

const User = require("../models/User.model.js");





//GET /profile/signin
router.get("/signin", (req, res, next) => {

    res.render("user/signin.hbs")
})

//POST /profile/signin
router.post("/signin", async (req, res, next) => {
    const { username, email, password } = req.body

    if (username === "" || email === "" || password === "") {
        res.status(401).render("user/signin.hbs", {
            errorMessage: "Todos los campos son obligatorios",
        });
        return
    }

    try {
        const trueUser = await User.create({
            username : username,
            email: email,
            password : password
        })




            res.redirect("/ ")
    } catch (error) {
        next(error)
    }



})



module.exports = router;
