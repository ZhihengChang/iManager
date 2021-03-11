/**
 * server_utilites
 * 
 * used by: * server side file
 * descriptions: simplify server operations and to client communications
 */

const logger = require("./logger");

/**
 * Send json response with status code
 * @param {Response} res 
 * @param {Number} statusCode 
 * @param {Object} data 
 */
exports.sendResponse = function(res, statusCode, data){
    res.status(statusCode).json(data);
}