/**
 * User Controller
 * 
 * used by: userRoutes.js
 * descriptions: provides user management functions
 */

//utils
const path = require('path')
const util = require('../../util/server_utilities');
const Logger = require("../../util/Logger");
const logger = new Logger(path.basename(__filename));
logger.details(true);

const DBAPI = require('../../util/DBAPI');
//Models
const User = require('../models/userModel');
const passport = require('passport');

//Middlewares


//Controller Functions

/**
 * Get specific user by object id
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getUser = async function(req, res){
    logger.log("get user " + req.params.id).msg();
    try {
        const user = await User.findById(req.params.id);
        util.sendResponse(res, 200, {
            status: 'success',
            data: { user }
        });
    }catch(err){
        util.sendResponse(res, 404, {
            status: 'fail',
            message: err
        });
    }
}

/**
 * Get all users in user collections
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getAllUser = async function(req, res){
    logger.log("get all users").msg();
    try {
        //modify query with DBAPI
        const result = new DBAPI(User.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const users = await result.query;
        util.sendResponse(res, 200, {
            status: 'success',
            result: result.length,
            data: { users }
        });
    }catch(err){
        util.sendResponse(res, 404, {
            status: 'fail',
            message: err
        });
    }
}

/**
 * Create a user based on request body
 * @param {Request} req 
 * @param {Response} res 
 */
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

/**
 * Delete a specific user by object id
 * @param {Request} req 
 * @param {Response} res 
 */
exports.deleteUser = async function(req, res){
    logger.log("delete user " + req.params.id).msg();
    try {
        const result = await User.findByIdAndDelete(req.params.id);
        util.sendResponse(res, 200, {
            status: 'success',
            data: { result }
        });
    } catch (err) {
        util.sendResponse(res, 404, {
            status: 'fail',
            message: err
        });
    }
}

/**
 * Update a user based on request body
 * @param {Request} req 
 * @param {Response} res 
 */
exports.updateUser = async function(req, res){
    logger.log("update user " + req.params.id).msg();
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,              //return updated document
            runValidators: true,    //validate model  
        })
        util.sendResponse(res, 204, {
            status: 'success',
            data: null,
        });
    } catch (err) {
        util.sendResponse(res, 404, {
            status: 'fail',
            message: err
        });
    }
}

/**
 * Validate username password pair
 * @param {Request} req 
 * @param {Response} res 
 */
exports.validateUser = function(req, res){
    logger.log("validate user " + req.body.username).msg();
    passport.authenticate('local', {
        successRedirect: `/dashboard/${req.body.username}`,
        failureRedirect: "/",
        failureFlash: true
    })(req, res);
}

/**
 * Render user dashboard after successful login
 * @param {Request} req 
 * @param {Response} res 
 */
 exports.renderUserDashboard = async function(req, res){
    try{
        const user = await User.findOne({username: req.params.username}).lean();
        res.render("dashboard", {
            userInfo: user
        });
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
}