const mongoose = require('mongoose');
const scheduleSchema = require('./scheduleModel')
const requestSchema = require('./requestModel')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'A user must have a username'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'A user must have a password'],
    },

    email: {
        type: String,
        required: [true, 'A user must have an email']
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    schedule: {
        type: [scheduleSchema],
        required: [true, 'A user must have a schedule']
    },

    createTime: {
        type: Date,
        default: Date.now(),
        required: [true, 'A user account must have a creation time']
    },

    lastLogin: {
        type: Date,
        default: 0,
        required: [true, 'A user account must have a last login time']
    },

    request: {
        type: [requestSchema],
        default: [],
        required: [false, 'A user does not need to have a request']
    }

});
const User = mongoose.model('User', userSchema);
module.exports = User;