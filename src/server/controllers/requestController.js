const catchAsync = require('../../util/error/catchAsync');
const AppError = require('../../util/error/appError');
const User = require('../models/userModel');
const Faculty = require('../models/facultyModel');

// renders the request page for user
exports.renderRequest = catchAsync(async function(req, res) {

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
        schedule:       user.schedule,
        position:       employeeUser.jobPosition
    }

    res.render('requestform', {
        userInfo
    });
});

exports.sendRequest = catchAsync(async function(req, res) {
    console.log(req.body);
});