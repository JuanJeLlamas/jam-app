const express = require('express');
const router = express.Router();

const { updateLocals } = require("../middleware/user-middlewares.js")
router.use(updateLocals)

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const profileRoute = require("./profile.routes.js")
router.use("/profile", profileRoute)


const commentsRoute = require("./comments.routes.js")
router.use("/comments", commentsRoute)

const privateProfileRoute = require("./private-profile.routes.js")
router.use("/private-profile", privateProfileRoute)

const groupsRoute = require("./groups.routes.js")
router.use("/groups", groupsRoute)




module.exports = router;
