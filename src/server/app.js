const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan"); //a logger module
const flash = require("connect-flash");
const passport = require("passport");
const session = require("express-session");
const path = require("path");

//Routes
const userRoutes = require("./routes/userRoutes");

const app = express();

//Get views path
const parentDir = path.join(__dirname, '../');
const viewDir = path.join(parentDir, 'client/views');

//Set views path
app.set('views', viewDir);

//Passport config
require('../config/passport')(passport);

//Set EJS
app.use(expressLayouts);
app.set('view engine', 'ejs'); 

// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

// Connect Flash
app.use(flash());

// Necessary Globals
app.use((req, res, next) => {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash("error");
    next();
});

// Built-in bodyParser middleware
app.use(express.urlencoded({ extended: false }));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Mounting
app.use(morgan("dev"));
app.use(express.json());
//app.use("/api/v1/users", userRoutes);
app.use("/", userRoutes);

//Set home page to Login Page and render
app.get("/", function (req, res){
    res.render("login");
});

module.exports = app;