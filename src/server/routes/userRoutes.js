const express = require("express");
//get all users routes
const {ensureAuthenticated} = require("../../config/auth");
const routes = require("../../config/routes.json").users;    
const userController = require("../controllers/userController");

const router = express.Router();

//Routes
router.route("/insert/:admin")
    .get(ensureAuthenticated, userController.renderInsertNewEmployee);

router.route("/:admin/insertEmployee")
    .post(ensureAuthenticated, userController.insertNewEmployee);
    
router.route(routes.userCreate)
    .get(ensureAuthenticated, userController.createUser);

router.route(routes.userLogin)
    .post(userController.validateUser);

router.route(`/firstTimeLogin/:username`)
    .get(ensureAuthenticated, userController.renderChangePassword);

router.route(`/changePassword/:username`)
    .post(ensureAuthenticated, userController.changePassword);

router.route(routes.userLogout)
    .get(ensureAuthenticated,  userController.logOutUser);

router.route(routes.userProfile)
    .get(ensureAuthenticated, userController.renderUserProfile);

router.route(routes.userRoot)
    .get(userController.getAllUser)
    .post(userController.createUser);

router.route(routes.userInfo)
    .get(ensureAuthenticated, userController.getUser)
    .delete(ensureAuthenticated, userController.deleteUser);

router.route(routes.userProfileUpdate)
    .post(ensureAuthenticated, userController.updateUserProfile);

router.route(routes.userDashboard)
// router.route(routes.userDashboard)
    .get(ensureAuthenticated, userController.renderUserDashboard);

router.route(routes.userProfileEdit)
    .get(ensureAuthenticated, userController.renderEditProfile);


module.exports = router;