const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userid: {
        type: Number,
        required: [true, 'A user must have a user id'],
        unique: true
    },
    //and more
});
const User = mongoose.model('User', userSchema);
module.exports = User;