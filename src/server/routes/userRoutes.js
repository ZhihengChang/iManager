const express = require("express");
//get all users routes
const {ensureEmployeeAuthenticated, ensureAdminAuthenticated} = require("../../config/auth");
const routes = require("../../config/routes.json").users;
const userController = require("../controllers/userController");

const router = express.Router();

//Routes
router.route(routes.userLogin)
    .post(userController.validateUser);

router.route(routes.userLogout)
    .get(userController.logOutUser);

router.route(routes.userProfile)
    .get(ensureEmployeeAuthenticated, userController.renderUserProfile);

router.route(routes.userRoot)
    .get(userController.getAllUser)
    .post(userController.createUser);

router.route(routes.userInfo)
    .get(userController.getUser)
    .delete(userController.deleteUser);

router.route(routes.userProfileUpdate)
    .post(userController.updateUserProfile);

router.route(routes.userDashboard)
// router.route(routes.userDashboard)
    .get(ensureEmployeeAuthenticated, userController.renderUserDashboard);

router.route(routes.userProfileEdit)
    .get(userController.renderEditProfile);

module.exports = router;