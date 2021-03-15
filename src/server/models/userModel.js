const mongoose = require('mongoose');
const scheduleSchema = require('./scheduleModel').schema;
const requestSchema = require('./requestModel').schema;
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

    schedule: [scheduleSchema],

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

    request: [requestSchema]

});
const User = mongoose.model('User', userSchema);
module.exports = User;