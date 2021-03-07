/**
 * User Controller
 * 
 * used by: userRoutes.js
 * descriptions: provides user management functions
 */

//utils
const util = require('../../util/server_utilities');
const logger = require('../../util/logger');

//Models
const User = require('../models/userModel');

//Middlewares


//Controller Functions
exports.getUser = function(req, res){

}

exports.getAllUser = function(req, res){

}

exports.createUser = async function(req, res){
    try{
        const newUser = await User.create(req.body);
        util.sendResponse(res, 200, {
            status: 'success',
            data: { user: newUser }
        });
    }catch(err){
        util.sendResponse(res, 400, {
            status: 'fail',
            message: err
        });
    }  
}

exports.deleteUser = function(req, res){

}

exports.updateUser = function(req, res){

}

exports.validateUser = function(req, res){

}