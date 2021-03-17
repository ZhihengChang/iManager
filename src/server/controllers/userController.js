/**
 * User Controller
 * 
 * used by: userRoutes.js
 * descriptions: provides user management functions
 */

//utils
const path = require('path')
const util = require('../../util/server_utilities');
const Logger = require("../../util/Logger");
const DBAPI = require('../../util/DBAPI');
const catchAsync = require('../../util/error/catchAsync');
//Models
const User = require('../models/userModel');
const Faculty = require('../models/facultyModel');
const passport = require('passport');
const AppError = require('../../util/error/appError');

const logger = new Logger(path.basename(__filename));
logger.details(true);

//Middlewares


//Controller Functions

/**
 * Get specific user by object id
 */
exports.getUser = catchAsync(async function (req, res, next) {
    let id = req.params.id;
    logger.log("get user " + req.params.id).msg();

    const user = await User.findById(id);
    if(!user){
        return next(new AppError(`No user found with Id ${id}`, 404));
    }
    util.sendResponse(res, 200, {
        status: 'success',
        data: { user }
    });
});

/**
 * Get all users in user collections
 */
exports.getAllUser = catchAsync(async function (req, res, next) {
    logger.log("get all users").msg();

    //modify query with DBAPI
    const result = new DBAPI(User.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const users = await result.query;
    util.sendResponse(res, 200, {
        status: 'success',
        result: result.length,
        data: { users }
    });
});

/**
 * Create a user based on request body
 */
exports.createUser = catchAsync(async function (req, res, next) {
    logger.log("create user").msg();

    const newUser = await User.create(req.body);
    util.sendResponse(res, 201, {
        status: 'success',
        data: { user: newUser }
    });
});

/**
 * Delete a specific user by object id
 */
exports.deleteUser = catchAsync(async function (req, res, next) {
    logger.log("delete user " + req.params.id).msg();

    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
        return next(new AppError(`No user found with Id ${id}`, 404))
    }
    util.sendResponse(res, 200, {
        status: 'success',
        data: { result }
    });
});

/**
 * Update a user based on request body
 */
exports.updateUser = catchAsync(async function (req, res, next) {
    let id = req.params.id
    logger.log("update user " + id).msg();

    const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,              //return updated document
        runValidators: true,    //validate model  
    });
    if(!user){
        return next(new AppError(`No user found with Id ${id}`, 404));
    }
    util.sendResponse(res, 204, {
        status: 'success',
        data: null,
    });
});

/**
 * Validate username password pair
 * @param {Request} req 
 * @param {Response} res 
 */
exports.validateUser = function (req, res) {
    logger.log(`validate user "${req.body.username}"`).msg();

    passport.authenticate('local', {
        successRedirect: `/users/dashboard/${req.body.username}`,
        failureRedirect: "/",
        failureFlash: true
    })(req, res);
}

/**
 * log out user
 * @param {Request} req 
 * @param {Response} res 
 */
exports.logOutUser = function (req, res){
    logger.log("logged out user").msg();
    req.logOut();
    req.flash("success_message", "You are now logged out");
    res.redirect("/");
}

/**
 * Render user dashboard after successful login
 */
exports.renderUserDashboard = catchAsync(async function (req, res, next) {
    const user = await User.findOne({ username: req.params.username }).lean();
    res.render("dashboard", {
        userInfo: user
    });
});

exports.renderUserProfile = catchAsync(async function (req, res, next) {
    const username = req.params.username;
    const user = await User.findOne({ username }).lean();

    //user not exist
    if(!user){
        return next(
            new AppError(
                `No user found with username ${username}.`, 
                404
            )
        );
    }

    //get faculty document
    const faculty = await Faculty.findOne({
        email: user.email
    }).lean();

    //faculty not exist
    if(!faculty){
        return next(
            new AppError(
                `No employee record found.`, 
                404
            )
        );
    }

    //combine document
    util.deleteProperties(user, [
        "password", "schedule", "request"
    ]);
    util.deleteProperties(faculty, [
        "bankAccountNumber", "isDirectDeposit"
    ]);
    let userProfile = util.merge([user, faculty]);

    util.sendResponse(res, 200, {
        status: 'success',
        data: userProfile
    });
    res.render("profile", {
        userProfile
    });
});
