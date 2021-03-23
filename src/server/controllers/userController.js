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
exports.updateUserProfile = catchAsync(async function (req, res, next) {
    
    let user_id = req.params.userid;
    let employee_id = req.params.employeeid;
    console.log(employee_id);

    logger.log("update user " + user_id).msg();
    console.log(req.body);

    const updateOption = {
        new: true,              //return updated document
        runValidators: true,    //validate model  
    };

    const user = await User.findByIdAndUpdate(user_id, {
        username:   req.body.username,
        email:      req.body.email,
    }, updateOption);

    if(!user){
        return next(
            new AppError(
                `No user found with Id ${user_id}`, 
                404
            )
        );
    }

    const employee = await Faculty.findByIdAndUpdate(employee_id, {
        firstName:      req.body.firstName,
        lastName:       req.body.lastName,
        phoneNumber:    req.body.phoneNumber,
        email:          req.body.email,
    }, updateOption);

    if(!employee){
        return next(
            new AppError(
                `No Employee found with Id ${employee_id}`, 
                404
            )
        );
    }

    const profileRoute = `/users/profile/${user.username}`;
    res.redirect(profileRoute);
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

/**
 * Render edit user profile page on click
 */
 exports.renderEditProfile = catchAsync(async function (req, res, next) {
    const user = await User.findOne({ username: req.params.username }).lean();
    const employeeUser = await Faculty.findOne({ email: user.email }).lean();

    const userInfo = {
        user_id:        user._id,
        employee_id:    employeeUser._id,
        username:       user.username,
        firstName:      employeeUser.firstName,
        lastName:       employeeUser.lastName,
        phoneNumber:    employeeUser.phoneNumber,
        email:          user.email,

    }

    console.log(userInfo);

    res.render("edprofile", {
        userInfo
    });
});


/**
 * Render user profile page on click
 */
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
    let userInfo = util.merge([user, faculty]);

    res.render("profile", {
        userInfo
    });
});
