module.exports = {
    ensureEmployeeAuthenticated: function(req, res, next) {
        if(req.isAuthenticated() && req.user.isAdmin === false){
            next();
        }
        else{
            req.flash("error_message", "Please Log In as an Employee");
            res.redirect("/");
        }
    },
    ensureAdminAuthenticated: function(req, res, next) {
        if(req.isAuthenticated() && req.user.isAdmin === true){
            next();
        }
        else{
            req.flash("error_message", "Please Log In as an Admin");
            res.redirect("/");
        }
    }

}