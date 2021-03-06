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

exports.deleteProperties = function(obj, propertyList){
    propertyList.forEach(prop => {
        delete obj[prop];
    });
}

exports.merge = function(objList){
    let obj = objList.reduce((result, current)=>{
        return Object.assign(result, current);
    });
    return obj;
}

exports.generatePassword = function(length) {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
            'abcdefghijklmnopqrstuvwxyz' +
            '0123456789@#$';
      
    for (i = 1; i <= length; i++) {
        var char = Math.floor(Math.random()* str.length + 1);  
        pass += str.charAt(char)
    }
      
    return pass;
}