const mongoose = require('mongoose');
const requestSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Must have a name']
    },

    dateCreated: {
        type: Date,
        default: new Date,
    },
    //I believe its possible to have an array of string options for what types of requests we want
    //to have, can edit this in the future when we decide on what options
    requestType: {
        type: String,
        required: [true, 'Must have a request type']
    },

    targetDate: {
        type: Date,
        default: new Date,
    },
    //Put this field as optional for now, unless we want to make it required to submit a request
    requestDescription: {
        type: String,
        //required: [false, 'Description not required']
    }
});
const Request = mongoose.model('Request', requestSchema);
module.exports = Request;