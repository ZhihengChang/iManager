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

