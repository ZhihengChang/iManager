const catchAsync = require('../../util/error/catchAsync');
const AppError = require('../../util/error/appError');
const User = require('../models/userModel');
const Faculty = require('../models/facultyModel');

exports.renderSchedule = catchAsync(async function (req, res, next) {
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
    console.log(userInfo)
    res.render('schedule', {
        userInfo
    });

});

//Gets all user schedules and displays all of the times for each user
exports.getAllSchedule = catchAsync(async function (req, res, next) {
    const users = await User.find({}, function(error, users){
    if(error){
        console.log(error)
    } else {
        const schedules = [];
        for(let i = 0; i < users.length; i++){
            schedules.push(users[i].schedule);
        }
        res.send(schedules);
    }
    }).lean();
    
});

