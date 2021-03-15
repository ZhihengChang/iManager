const mongoose = require('mongoose');
const requestSchema = new mongoose.Schema({
    dateCreated: {
        type: Date,
        required: [true, 'Must have a creation date']
    },
    //I believe its possible to have an array of string options for what types of requests we want
    //to have, can edit this in the future when we decide on what options
    typeOfRequest: {
        type: String,
        required: [true, 'Must have a request type']
    },
    //Put this field as optional for now, unless we want to make it required to submit a request
    description: {
        type: String,
        required: [false, 'Description not required']
    }
});
const User = mongoose.model('Request', requestSchema);
module.exports = User;