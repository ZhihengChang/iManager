const mongoose = require('mongoose');
const facultySchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Must have an email']
    },

    phoneNumber: {
        type: String,
        required: [true, 'Must have a phone number']
    },

    firstName: {
        type: String,
        required: [true, 'Must have a first name']
    },

    lastName: {
        type: String,
        required: [true, 'Must have a last name']
    },

    gender: {
        type: String,
        required: [false, 'Do not need to provide gender']
    },

    jobPosition: {
        type: String,
        required: [true, 'Must have a job position']
    },

    companyName: {
        type: String,
        required: [true, 'Must have a company name']
    },

    wage: {
        type: Number,
        required: [true, 'Must have a wage']
    },

    bankAccountNumber: {
        type: Number,
        default: null,
        required: [false, 'bankAccountNumber not required']
    },

    isDirectDeposit: {
        type: Boolean,
        default: false,
        required: [true, 'Must declare direct deposit status']
    },

    socialSecurityNumber: {
        type: Number,
        required: [true, 'Must have a social security number']
    },
    hasAccount: {
        type: Boolean,
        default: false
    }
});
const faculty = mongoose.model('Faculty', facultySchema);
module.exports = faculty;