const catchAsync = require('../../util/error/catchAsync');
const AppError = require('../../util/error/appError');
const User = require('../models/userModel');
const Faculty = require('../models/facultyModel');
const util = require('../../util/server_utilities');

exports.renderPayroll = catchAsync(async function (req, res, next) {
    const user = await User.findOne({ username: req.params.username }).lean();
    if(!user){
        return next(
            new AppError(
                `No user found with username ${req.params.username}`, 
                404
            )
        );
    }

    const employeeUser = await Faculty.findOne({ email: user.email }).lean();
    if(!employeeUser){
        return next(
            new AppError(
                `No employee found with user email ${user.email}`,
                404
            )
        );
    }

    //Userinfo
    const userInfo = {
        user_id:        user._id,
        employee_id:    employeeUser._id,
        username:       user.username,
        firstName:      employeeUser.firstName,
        lastName:       employeeUser.lastName,
        position:       employeeUser.jobPosition,
        wage:           employeeUser.wage
    }

    userInfo.payroll = [];

    //Get schedule and calculate payroll
    const schedule = user.schedule;
    for(const week of schedule){
        const pr = { 
            year: week.year,
            weekNumber: week.weekNumber,
            totalHours: week.weeklyHours,
            totalIncome: week.weeklyHours * userInfo.wage
        }
        userInfo.payroll.push(pr);
    }

    // console.log(userInfo)
    res.render('payroll', {
        userInfo
    });
});
