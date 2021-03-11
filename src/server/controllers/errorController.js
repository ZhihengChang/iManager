/**
 * Error Controller
 * 
 * used by: app.js
 * descriptions: This controller is not for resource managment but for global error handling
 */

const util = require('../../util/server_utilities');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500; //internal server error
    err.status = err.status || 'error'
    util.sendResponse(res, err.statusCode, {
        status: err.status,
        message: err.message,
    });
}