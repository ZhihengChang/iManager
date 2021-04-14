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
const passport = require('passport');
const AppError = require('../../util/error/appError');
const bcrypt = require('bcryptjs');
const sendEmail = require('../../util/email');
//Models
const User = require('../models/userModel');
const Faculty = require('../models/facultyModel');
const Request = require('../models/requestModel');

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
 * Create a user and send a notification email to user email
 */
exports.createUser = catchAsync(async function (req, res, next) {
    logger.log("create user").msg();
    
    //check user already exist
    let employee_id = req.params.employeeid;
    const employee = await Faculty.findById(employee_id);
    if(!employee){
        return next(
            new AppError(
                'Employee Not Found!',
                404
            )
        );
    }
    const user = await User.findOne({ email: employee.email });
    if(user){
        return next(
            new AppError(
                'User account already exist!',
                400
            )
        );
    }

    //set up credentials username, email, password
    let username = `${employee.lastName + employee.firstName.charAt(0)}`.toLowerCase();
    
    let salt = await bcrypt.genSalt(10)
    let password = util.generatePassword(25);
    // console.log("password:", password);
    let hashed = await bcrypt.hash(password, salt);

    await User.create({
        username,
        email: employee.email,
        password: hashed,
    });

    employee.hasAccount = true;

    await employee.save();

    //send token to user's email
    const distURL = `${req.protocol}://${req.get('host')}`;
    const message = 
        `Hello ${employee.firstName}, \n` + 
        `An iManager user account has been created on your behalf by your manager. \n` +
        `You can login using below username and one-time password at ${distURL}: \n\n` +
        `\t username: ${username} \n` +
        `\t password: ${password} \n\n` +
        `If you have trouble logging in, please contact your manager for more information.`;

    try {
        await sendEmail({
            email: employee.email,
            subject: 'iManager User Account',
            message,
        });

        req.flash("success_message", "Email sent to the User");
        res.redirect(`/users/dashboard/${req.params.admin}`);
        // util.sendResponse(res, 200, {
        //     status: 'sucess',
        //     message: 'Email sent to employee!',
        // });

    } catch (err) {
        console.log(err);
        return next(
            new AppError(
                'There was an error sending the email, please try again later.',
                500
            )
        );
    }
});

exports.changePassword = catchAsync(async function (req, res, next) {

    const username = req.params.username
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
    
    if(password != passwordConfirm){
        
        req.flash("error_message", "Passwords do not match!");
        res.redirect(`/users/firstTImeLogin/${req.params.username}`)
        return next()
        
    }
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt);
        
        const user = await User.findOne({ username });
        if(!user){
            return next(new AppError(`No user found!`, 404));
        }
        
        user.password = hashed;
        await user.save();
        
    req.flash("success_message", "Password Changed");
    
    const dashboardRoute = `/users/dashboard/${user.username}`;
    res.redirect(dashboardRoute);
})

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

    logger.log("update user " + user_id).msg();

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
    req.flash("success_message", "You are profile has been updated");
    
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

    passport.authenticate('local', (err, user, info) => {
        if(err) next(err);
        if(!user) {
            req.flash("error_message", "The username or password is incorrect");
            return res.redirect("/");
        }
        req.logIn(user, async function(err){
            if(err) return next(err);
            if(user.lastLogin.getTime() == new Date(0).getTime()) {
                user.lastLogin = new Date();
                await user.save();
                return res.redirect(`/users/firstTimeLogin/${req.body.username}`);
            }
            return res.redirect(`/users/dashboard/${req.body.username}`);
        })
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
    if(user.isAdmin === true){
        const allFaculty = await Faculty.find({}).lean();
        res.render("dashboard", {
            userInfo: user,
            faculty: allFaculty
        });
    }
    else{

        let requests = await Request.find({ username: user.username });

        res.render("dashboard", {
            userInfo: user,
            requests
        });
    }
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

exports.renderChangePassword = catchAsync(async function (req, res, next) {
    const user = await User.findOne({ username: req.params.username }).lean();
    res.render("changePassword", {
        userInfo: user
    });
});

exports.renderInsertNewEmployee = catchAsync(async function (req, res, next) {
    const user = await User.findOne({ username: req.params.admin }).lean();
    res.render("InsertNewEmployee", {
        userInfo: user
    });
});

exports.insertNewEmployee = catchAsync(async function (req, res, next) {
    console.log(req.body)
    console.log(req.params)
    const employee = await Faculty.findOne({ email: req.body.email});

    if(employee){
        req.flash("error_message", "Employee already exists!");
        res.redirect(`/users/dashboard/${req.params.admin}`)
    }

    await Faculty.create(req.body);

    req.flash("success_message", "Employee Created!");
    res.redirect(`/users/dashboard/${req.params.admin}`)
});
