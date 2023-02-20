const isLoggedIn = (req, res, next) => {
    if (req.session.activeUser === undefined) {
      res.redirect("/profile/login")
    } else {
      next() 
    }
  }
  
// comprobamos si el usuario es artista o particular
  const isArtist = (req, res, next) => {
    if (req.session.activeUser.role !== "artista") {
      res.redirect("/profile/login")
    } else {
      next() 
    }
  }
  
  const isParticular = (req, res, next) => {
    if (req.session.activeUser.role !== "particular") {
      res.redirect("/profile/login")
    } else {
      next() 
    }
  }
  module.exports = {
    isLoggedIn: isLoggedIn,
    isArtist: isArtist,
    isParticular: isParticular
    
  }