/**
 * server_utilites
 * 
 * used by: * server side file
 * descriptions: simplify server operations and to client communications
 */

const logger = require("./logger");

exports.sendResponse = function(res, statusCode, data){
    res.status(statusCode).json(data);
}