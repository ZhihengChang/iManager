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

    jobPosition: {
        type: String,
        required: [true, 'Must have a job position']
    },

    companyName: {
        type: String,
        required: [true, 'Must have a company name']
    },

    wage: {
        type: mongoose.Types.Decimal128,
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
    }
});
const User = mongoose.model('Faculty', facultySchema);
module.exports = User;