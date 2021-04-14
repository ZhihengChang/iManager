const catchAsync = require('../../util/error/catchAsync');
const AppError = require('../../util/error/appError');
const User = require('../models/userModel');
const Faculty = require('../models/facultyModel');
const Request = require('../models/requestModel');
const util = require('../../util/server_utilities');

// renders the request page for user
exports.renderViewRequest = catchAsync(async function(req, res, next) {

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

    if(user.isAdmin == true){
        const allRequests = await Request.find({}).lean();

        res.render('requestform', {
            userInfo,
            requests: allRequests
        });
    }
    else{
        res.render('requestform', {
            userInfo
        });
    }
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

    req.flash("success_message", "Request sent!");
    res.redirect(`/requests/${username}`);

});

exports.approveRequest = catchAsync(async function(req, res) {

    const request = await Request.findById( req.params.requestId );

    if(!request){
        return next(
            new AppError(
                `No Request found with requestID ${req.params.requestId}`,
                404
            )
        );
    }

    request.status = "Approve";

    await request.save();

    res.redirect(`/requests/${req.params.admin}`);    

});


exports.declineRequest = catchAsync(async function(req, res) {

    const request = await Request.findById( req.params.requestId );

    if(!request){
        return next(
            new AppError(
                `No Request found with requestID ${req.params.requestId}`,
                404
            )
        );
    }

    request.status = "Decline";

    await request.save();

    res.redirect(`/requests/${req.params.admin}`);    

});