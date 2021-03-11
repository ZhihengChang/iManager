//utils
const util = require('../util/server_utilities');
const AppError = require('../util/error/appError');
const Logger = require('../util/logger');
const globalErrorHandler = require('./controllers/errorController');

//app
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan"); //a logger module
const flash = require("connect-flash");
const passport = require("passport");
const session = require("express-session");
const path = require("path");

const logger = new Logger();

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

//Serve static files
const clientDir = path.join(parentDir, 'client');
app.use(express.static(clientDir))

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
app.use("/users", userRoutes);

//Set home page to Login Page and render
app.get("/", function (req, res){
    res.render("login");
});

//Error handling
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;