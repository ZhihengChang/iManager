module.exports = {
    ensureAuthenticated: function(req, res, next) {
        // console.log("auth.js:", req.user);
        if(req.isAuthenticated() && req.user){
            next();
        }
        else{
            req.flash("error_message", "Please Log in to View");
            res.redirect("/");
        }
    }
}