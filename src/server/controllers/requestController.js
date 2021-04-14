const catchAsync = require('../../util/error/catchAsync');
const AppError = require('../../util/error/appError');
const User = require('../models/userModel');
const Faculty = require('../models/facultyModel');
const Request = require('../models/requestModel');
const util = require('../../util/server_utilities');

// renders the request page for user
exports.renderRequest = catchAsync(async function(req, res, next) {

    const user = await User.findOne({ username: req.params.username }).lean();
    const employeeUser = await Faculty.findOne({ email: user.email }).lean();

    const userInfo = {
        isAdmin:        user.isAdmin,
        user_id:        user._id,
        employee_id:    employeeUser._id,
        username:       user.username,
        firstName:      employeeUser.firstName,
        lastName:       employeeUser.lastName,
        phoneNumber:    employeeUser.phoneNumber,
        email:          user.email,
        schedule:       user.schedule,
        position:       employeeUser.jobPosition
    }

    res.render('requestform', {
        userInfo
    });
});

exports.renderViewRequest = catchAsync(async function(req, res, next) {
    // const allRequest = await Request.find({});

});

exports.sendRequest = catchAsync(async function(req, res) {
    console.log(req.body);
    // create request and save
    const username = req.body.username; 
    const newRequest = await Request.create(req.body);
    
    // save request id to user.request
    const user = await User.findOne({ username });
    if(!user){
        return next(
            new AppError(
                `No User found with username ${username}`,
                404
            )
        );
    }

    user.request.push(newRequest._id);
    await user.save();

    req.flash("success_message", "Request sent!");
    res.redirect(`/request/${username}`);

});