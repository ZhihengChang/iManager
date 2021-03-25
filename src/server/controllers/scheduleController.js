const catchAsync = require('../../util/error/catchAsync');
const AppError = require('../../util/error/appError');
const User = require('../models/userModel');

exports.renderSchedule = catchAsync(async function (req, res, next) {
    console.log(req.params);
    const user = await User.findOne({ username: req.params.username }).lean();
    console.log(user.schedule[0].monday);
    res.render('schedule', {
        userInfo: user
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

