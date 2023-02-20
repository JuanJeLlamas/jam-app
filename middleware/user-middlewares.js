const isLoggedIn = (req, res, next) => {
  if (req.session.activeUser === undefined) {
    res.redirect("/");
  } else {
    next();
  }
};

// comprobamos si el usuario es artista o particular
const isArtist = (req, res, next) => {
  if (req.session.activeUser.role !== "artista") {
    res.redirect("/profile/login");
  } else {
    next();
  }
};

const isParticular = (req, res, next) => {
  if (req.session.activeUser.role !== "particular") {
    res.redirect("/profile/login");
  } else {
    next();
  }
};

const updateLocals = (req, res, next) => {
  if (req.session.activeUser === undefined) {
    res.locals.isUserActive = false;
  } else { 
    if (req.session.activeUser.role === "artista") {
    res.locals.isUserArtist = true
  }
    res.locals.isUserActive = true;
  
   }
  next();
};
module.exports = {
  isLoggedIn: isLoggedIn,
  isArtist: isArtist,
  isParticular: isParticular,
  updateLocals: updateLocals,
 
};
