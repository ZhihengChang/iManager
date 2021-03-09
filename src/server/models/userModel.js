const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userid: {
        type: Number,
        required: [true, 'A user must have a user id'],
        unique: true
    },

    username: {
        type: String,
        required: [true, 'A user must have a username'],
        unique: true
    },

    password: {
        type: String,
        // required: [true, 'A user must have a password'],
    },

    //and more
});
const User = mongoose.model('User', userSchema);
module.exports = User;