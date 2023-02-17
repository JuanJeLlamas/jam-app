const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});



const profileRoute = require("./profile.routes.js")
router.use("/profile", profileRoute)


const commentsRoute = require("./comments.routes.js")
router.use("/user", commentsRoute)


module.exports = router;
